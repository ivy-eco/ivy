import { SubscribableEvent } from "../../services/dto/webhook.dto";

export interface IOpenWARoute {
    sessionId: string;
    registerInOpenWA: boolean;
    events: SubscribableEvent[];
}