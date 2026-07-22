import { ReceivedMessageEvent } from '../common';
import { AExtensionService } from './abstract-extension.service';
import { ExtensionContext } from './interfaces/extension-context.interface';

export abstract class AExtensionController<S extends AExtensionService> {
    constructor(protected service: S){}

    async handleData(body: ReceivedMessageEvent){
        if (body.event == "test") {
            console.log(body.data);
            return { success: true };
        }

        const ctx = await this.service.buildContext(body);

        if (ctx) {
            return this.triggerFunction(ctx);
        } else {
            return { success: false, message: "No functions found" };
        }
    }

    async triggerFunction(ctx: ExtensionContext) {
        for (const action of ctx.extension.actions) {
            const actionFunction = action.functions[0];

            if (actionFunction) {
                await this.service.process(actionFunction, ctx.body, action.values);
            }
        }

        return { success: true, message: "Complete" };
    }
}
