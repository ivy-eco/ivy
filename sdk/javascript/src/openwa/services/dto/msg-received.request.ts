
import { SubscribableEvent } from "./webhook.dto";

interface MsgData {
    id: string,
    from: string,
    to: string,
    chatId: string,
    body: string,
    type: string,
    timestamp: number,
    fromMe: boolean,
    isGroup: boolean
}

interface ReqBody {
    event: SubscribableEvent,
    timestamp: string,
    sessionId: string,
    idempotencyKey: string,
    deliveryId: string,
    data: MsgData
}