import { http } from "./api";

const sessionsWAApi = {
    getById: (id:string) => {
        return http.get<any>(`/api/sessions/WA/${id}`);
    }
};

const groupsApi = {
    getList: (sessionId:string) => http.get<any>(`/api/sessions/${sessionId}/groups/WA`)
};

export const waApi = {
    groups: groupsApi,
    sessions: sessionsWAApi,
} as const;