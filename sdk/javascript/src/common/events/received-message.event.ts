import { SubscribableEvent } from "./subscribable.event"

export interface ReceivedMessageData {
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

export interface ReceivedMessageEvent {
  event: SubscribableEvent | "test",
  timestamp: string,
  sessionId: string,
  idempotencyKey: string,
  deliveryId: string,
  data: ReceivedMessageData
}