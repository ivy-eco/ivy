import type { RegisterSessionBody, ResSession } from "../../models/session.model";
import { http } from "./http";

export const sessionsWAApi = {
    getById: (id:string) => {
        return http.get<any>(`/sessions/WA/${id}`);
    }
};

export const sessionsApi = {
    WA: sessionsWAApi,
    getRegistered: () => {
        return http.get<ResSession>("/sessions/registered")
    },
    register: (session: RegisterSessionBody) => {
        return http.post<any>(`/sessions`, session);
    },
    getById: (id:string) => {
        return http.get<any>(`/sessions/${id}`);
    },
};