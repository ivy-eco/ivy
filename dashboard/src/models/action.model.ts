import type { ExtensionModel } from "./extension.model";

export const SUBSCRIBABLE_EVENTS = [
  'message.received',
  'message.edited',
  'message.sent',
  'message.ack',
  'message.revoked',
  'session.status',
  'session.qr',
  'session.authenticated',
  'session.disconnected',
  'group.join',
  'group.leave',
  'group.update',
] as const;

export type SubscribableEvent = (typeof SUBSCRIBABLE_EVENTS)[number];

export interface ActionModel {
  id: number;
  command: string;
  events: SubscribableEvent [];
  selectedGroups: string[];
  extension: ExtensionModel;
  values: string[]
}

export interface ActionRegister {
  command: string | FormDataEntryValue;
  groups: any[];
  extension: string;
  functions: {
    extension: string;
    function: string;
    inputs: (string | FormDataEntryValue)[];
  }[];
}

export const RegisterActionSchema = {
    name: "",
    endpoint: "",
    sessionId: "",
    events: "",
};

export type RegisterActionBody = typeof RegisterActionSchema; 