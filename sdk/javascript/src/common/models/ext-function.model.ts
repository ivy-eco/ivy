import { Extension } from "./extension.model";
import { ActionFunction } from "./action-function.model";

export interface ExtFunction {
    id: number;
    name: string;
    command: string;
    inputs: string[];
    extension: Extension;
    actions: ActionFunction[];
}
