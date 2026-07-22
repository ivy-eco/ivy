import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RawAxiosRequestHeaders } from 'axios';
import { Action } from './entities/action.entity';
import { ExtFunction } from '../extension/entities/ext-function.entity';
import { ActionFunction } from './entities/action-function.entity';
import { Extension } from '../extension/entities/extension.entity';
import { ValuesField } from '@ivy-eco/sdk/common/interfaces/fields.interface';

@Injectable()
export class ActionService {
    headers: RawAxiosRequestHeaders;

    constructor(
        @InjectRepository(Extension)
        private extensionR: Repository<Extension>,
        @InjectRepository(Action)
        private actionR: Repository<Action>,
        @InjectRepository(ExtFunction)
        private functionR: Repository<ExtFunction>,
        @InjectRepository(ActionFunction)
        private actionFuncR: Repository<ActionFunction>,
        private config: ConfigService,
    ) {
        this.headers = {
            "X-API-Key": this.config.get("API_KEY"),
            "Content-Type": "application/json"
        }
    }

    async create(sessionId, data: ActionReq) {
        const extension = await this.extensionR.findOneBy({ name: data.extension });
        
        if(!extension)
            return { success: false };

        const action = await this.actionR.save({ 
            command: data.command, 
            session: { id: sessionId },
            extension: { id: extension.id },
            selectedGroups: data.groups,
            values: data.values
        });

        for (const item of data.functions) {
            const extFunc = await this.functionR.findOne({
                where: {
                    command: item.function,
                    extension: { name: item.extension }
                }
            });

            if (extFunc) {
                await this.actionFuncR.save({
                    action: { id: action.id },
                    function: { id: extFunc.id },
                    values: item.inputs,
                    command: item.command
                });
            }
        }

        return { success: true }
    }

    getBySessionId(sessionId: string){
        const actions = this.actionR.find({
            where: { session: { id: sessionId } },
            relations: { extension: true }
        });

        return actions;
    }
}

interface ActionFuncReq {
    extension: string;
    function: string;
    inputs: string[];
    command: string;
}

export interface ActionReq {
    command: string;
    functions: ActionFuncReq[];
    extension: string;
    groups: string[];
    values: ValuesField[];
}