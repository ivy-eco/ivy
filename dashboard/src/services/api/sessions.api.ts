import type { RegisterSessionBody, ResSession } from "../../models/session.model";
import { http } from "./http";

export const sessionsWAApi = {
    getById: (id:string) => {
        return http.get<any>(`/api/sessions/WA/${id}`);
    }
};

export const sessionsApi = {
    WA: sessionsWAApi,
    getRegistered: () => {
        return http.get<ResSession>("/api/sessions/registered")
    },
    register: (session: RegisterSessionBody) => {
        return http.post<any>(`/api/sessions`, session);
    },
    getById: (id:string) => {
        return http.get<any>(`/api/sessions/${id}`);
    },
};