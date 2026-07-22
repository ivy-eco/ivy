import { Action } from "./action.model";

export interface Session {
    id: string
    name: string
    description: string
    phone: string;
    actions: Action[];
}
