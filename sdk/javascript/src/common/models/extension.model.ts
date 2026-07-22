import { InputsField } from "../interfaces/fields.interface";
import { Action } from "./action.model";
import { ExtFunction } from "./ext-function.model";

export interface Extension {
    id: number;
    name: string;
    endpoint: string;
    actions: Action[]
    functions: ExtFunction[];
    events: string[];
    inputs: InputsField[];
}
