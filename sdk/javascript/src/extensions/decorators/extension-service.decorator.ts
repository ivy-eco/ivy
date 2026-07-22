import { InputsField } from "../../common/interfaces/fields.interface";

export const ExtensionService = (inputs: InputsField[] = []): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata('is_extension_service', true, target);
        Reflect.defineMetadata('service_inputs', inputs, target);
    };
};