import { ReceivedMessageEvent } from '../../common/events/received-message.event';
import { Extension } from '../../common/models/extension.model';

export interface ExtensionContext {
    body: ReceivedMessageEvent;
    extension: Extension;
}