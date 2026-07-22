export const RegisterSessionSchema = {
    id: "",
    name: "",
    phone: "",
    description: ""
};

export type RegisterSessionBody = typeof RegisterSessionSchema;

export interface ResSuccessSession {
    success: true;
    reason?: never;
    data: any;
}

export interface ResErrorSession {
    success: false;
    reason?: string;
    data: never;
}

export type ResSession = ResSuccessSession | ResErrorSession;