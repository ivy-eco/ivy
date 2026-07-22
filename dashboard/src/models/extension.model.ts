import type { SubscribableEvent } from "./action.model";

const INPUT_TYPES = [
    "input-text", 
    "input-password",
    "input-number",
    "textarea"
] as const;

export type InputType = (typeof INPUT_TYPES)[number];

export type ExtFunctionInput = "input-text" | "textarea";

export interface ExtFunction {
    command: string;
    inputs: ExtFunctionInput[]
}

export interface InputParam{
    name:string;
    input: InputType;
}

export interface ExtensionModel {
    name: string;
    events: SubscribableEvent[],
    functions: ExtFunction[];
    inputs: InputParam[];
}

export interface ExtensionModel {
    id: number;
    name: string;
    endpoint: string;
    events: SubscribableEvent[];
    inputs: InputParam[];
}

export interface ExtensionFunction { 
    id: number, 
    functionId: number, 
    extensionId:number, 
}
