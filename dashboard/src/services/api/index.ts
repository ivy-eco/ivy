import { actionsApi } from "./actions.api";
import { extensionsApi } from "./extensions.api";
import { sessionsApi } from "./sessions.api";
export { http, type HTTPError } from './http';

export const api = {
    sessions: sessionsApi,
    extensions: extensionsApi,
    actions: actionsApi,
} as const;