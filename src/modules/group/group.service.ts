//import { GroupsService } from '@ivy-eco/sdk/openwa';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RawAxiosRequestHeaders } from 'axios';
import { GroupsService } from '@ivy-eco/sdk';

@Injectable()
export class GroupService {
    headers: RawAxiosRequestHeaders;

    constructor(
        private config: ConfigService,
        private groupsS: GroupsService
    ) {
        this.headers = {
            "X-API-Key": this.config.get("API_KEY"),
            "Content-Type": "application/json"
        }
    }

    findAll(sessionId: string) {
        return this.groupsS.getList(sessionId)
    }
}