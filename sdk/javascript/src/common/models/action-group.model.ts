import { Action } from "./action.model";
import { Group } from "./group.model";

export class ActionGroup {
    id!: number;
    action!: Action;
    group!: Group;
}
