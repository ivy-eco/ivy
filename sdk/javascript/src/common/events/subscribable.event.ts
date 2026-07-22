export const SUBSCRIBABLE_EVENTS = [
    "message.received", 
    "message.edited", 
    "message.sent", 
    "message.ack", 
    "message.revoked", 
    "session.status", 
    "session.qr", 
    "session.authenticated", 
    "session.disconnected", 
    "group.join", 
    "group.leave", 
    "group.update"
] as const;

export type SubscribableEvent = (typeof SUBSCRIBABLE_EVENTS)[number];

export interface ResWebhookDto {
    id: string;
    sessionId: string;
    url: string;
    events: SubscribableEvent[];
    active: true;
    retryCount: 0;
    lastTriggeredAt: any;
    createdAt: string;
    updatedAt: string;
}
export interface ResVerifyDto {
    ok: boolean;
    message?: string;
}