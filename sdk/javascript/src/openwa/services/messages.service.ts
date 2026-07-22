import { Injectable } from '@nestjs/common';
import { BaseHttpService } from './base-http.service';
import { EditMessageDto, ReplyMessageDto, SendMessageDto } from "./dto/message.dto";

@Injectable()
export class MessagesService {
  constructor(private readonly http: BaseHttpService) {}

    sendMessage(sessionId: string, dto:SendMessageDto){
        return this.http.ref.post<{messageId:string}>(`/sessions/${sessionId}/messages/send-text`, dto);
    }

    editMessage(sessionId: string, dto:EditMessageDto){
        return this.http.ref.put<{messageId:string}>(`/sessions/${sessionId}/messages/edit-text`, dto);
    }
    
    reply(sessionId: string, dto: ReplyMessageDto) {
        return this.http.ref.post<{messageId:string}>(`/sessions/${sessionId}/messages/reply`, dto);
    }
}