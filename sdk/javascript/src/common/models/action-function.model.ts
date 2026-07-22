import { Action } from "./action.model";
import { ExtFunction } from "./ext-function.model";

export interface ActionFunction {
    id: number;
    values: string[];
    action: Action;
    function: ExtFunction;
}
