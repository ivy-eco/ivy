import { http } from "./api";

const sessionsWAApi = {
    getById: (id:string) => {
        return http.get<any>(`/sessions/WA/${id}`);
    }
};

const groupsApi = {
    getList: (sessionId:string) => http.get<any>(`/sessions/${sessionId}/groups/WA`)
};

export const waApi = {
    groups: groupsApi,
    sessions: sessionsWAApi,
} as const;