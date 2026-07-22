import { InputType } from "../../common/interfaces/fields.interface";

export const ExtensionFunction = (name: string, inputs: InputType[] = []): MethodDecorator => {
    return (target: any, propertyKey: string | symbol) => {
        const constructor = target.constructor;

        if (!constructor._extensionFunctionMap) {
            constructor._extensionFunctionMap = {};
        }

        constructor._extensionFunctionMap[name] = {
            methodName: propertyKey,
            inputs: inputs
        };
    };
};
