import { DataSource, Like } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ValuesField } from "../common/interfaces/fields.interface";
import { ReceivedMessageEvent } from "../common/events/received-message.event";
import { SubscribableEvent } from "../common/events/subscribable.event";
import { ExtensionContext } from './interfaces/extension-context.interface';
import { Action, ActionFunction, Extension } from '../common/models';

@Injectable()
export abstract class AExtensionService {
    @Inject(DataSource) 
    protected readonly dataSource: DataSource;

    async buildContext(body: ReceivedMessageEvent): Promise<ExtensionContext | undefined> {
        const { data } = body;
        const commands = data.body.split(" ");

        const extension = await this.dataSource.getRepository<Extension>("extensions").findOne({
            where: { endpoint: this.endpoint }
        });

        if (!extension) return undefined;

        const actions = await this.dataSource.getRepository<Action>("actions").find({
            where: {
                extension: { id: extension.id },
                selectedGroups: Like(`%"${data.chatId}"%`),
                command: commands[0]
            }
        });

        if (actions.length == 0) {
            return undefined;
        }

        if (commands.length > 1) {
            let founded: boolean = false;

            for (const action of actions) {
                const actionFunctions = await this.dataSource.getRepository<ActionFunction>("action_functions").find({
                    where: { action: { id: action.id }, function: { command: commands[1] } },
                    relations: { function: true }
                });

                if (actionFunctions) {
                    founded = true;
                    action.functions = actionFunctions;
                }
            }

            if (!founded) {
                await this.commandNotFound(body, commands[1]);
            }
        } else {
            for (const action of actions) {
                const actionFunctions = await this.dataSource.getRepository<ActionFunction>("action_functions").find({
                    where: { action: { id: action.id }, function: { command: "_default" } },
                    relations: { function: true }
                });

                if (actionFunctions) {
                    action.functions = actionFunctions;
                }
            }
        }

        extension.actions = actions;

        return { body, extension, };
    }

    async process(actionFunction: ActionFunction, body: ReceivedMessageEvent, values:ValuesField[], ) {
        const valuesObs:any = {};
        values.forEach(v => valuesObs[v.name] = v.value)
        return await this.executeAction(valuesObs, actionFunction, body);
    }

    private async executeAction(values:{[key:string]:string}, actionFunction: ActionFunction, body: ReceivedMessageEvent) {
        const funcName = actionFunction.function.name;
        const params = actionFunction.values;

        if (typeof this[funcName] === 'function') {
            return await this[funcName](body, params, values);
        }

        return { success: false };
    }

    abstract get endpoint():string;

    abstract get events():SubscribableEvent[];

    abstract commandNotFound(body, command: string):Promise<void>;
}