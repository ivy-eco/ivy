import { Injectable } from '@nestjs/common';
import { BaseHttpService } from './base-http.service';
import { EditMessageDto, ReplyMessageDto, SendMessageDto } from "./dto/message.dto";
import { OpenWAError } from './dto/session.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly http: BaseHttpService) {}

    async getList(sessionId: string):Promise<OpenWAError | any[]>{
        return (await this.http.ref.get(`/sessions/${sessionId}/groups`)).data;
    }
}