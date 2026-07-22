import type { ActionModel, RegisterActionBody } from "../../models/action.model";
import { http } from "./http";

export const actionsApi = {
    register: (sessionId:string, action: RegisterActionBody) => http.post<any>(`/api/sessions/${sessionId}/actions`, action),
    getListBySessionId: (sessionId:string)  => http.get<ActionModel[]>(`/api/sessions/${sessionId}/actions`),
};