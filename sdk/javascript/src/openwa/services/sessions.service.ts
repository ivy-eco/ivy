
import { Injectable } from '@nestjs/common';
import { BaseHttpService } from './base-http.service';
import { OpenWAError, WASession } from './dto/session.dto';

@Injectable()
export class SessionsService {
    constructor(private readonly http: BaseHttpService) {}

    async getList():Promise<OpenWAError | WASession[]>{
        return (await this.http.ref.get(`/sessions`)).data;
    }

    async getById(id:string):Promise<OpenWAError | WASession[]>{
        return (await this.http.ref.get(`/sessions/${id}`)).data;
    }
}