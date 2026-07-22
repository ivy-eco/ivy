import { Injectable } from '@nestjs/common';
import { BaseHttpService } from './base-http.service';
import { ResVerifyDto, ResWebhookDto, SubscribableEvent } from "./dto/webhook.dto";

@Injectable()
export class WebhooksService {
    constructor(private readonly http: BaseHttpService) {}

    async getBySessionId(sessionId:string){
        const response =  await this.http.ref.get<ResWebhookDto[]>(`/sessions/${sessionId}/webhooks`);
        const webhooks: ResWebhookDto[] = await response.data;
        return webhooks;
    }

    makeRegistration(sessionId:string, url:string, events: SubscribableEvent[], secret: string){
        const body = {
            url,
            events,
            secret,
            retryCount: 3
        };

        return this.http.ref.post<ResWebhookDto>(`/sessions/${sessionId}/webhooks`, body);
    };

    async verifyRegistration(sessionId:string, id: string): Promise<ResVerifyDto> {
        if(id === undefined){
            return {
                ok: false,
                message: "No webhookId"
            };
        }

        const response =  await this.http.ref.get<ResWebhookDto[]>(`/sessions/${sessionId}/webhooks`);
        const webhooks: ResWebhookDto[] = await response.data;

        if(webhooks.length == 0){
            return {
                ok: false,
                message: "No webhookId"
            };
        }
        
        for (let i = 0; i < webhooks.length; i++) {
            const webhook:ResWebhookDto = webhooks[i] as ResWebhookDto;
            if(webhook.id == id){
                return { ok: true }
            }
        }

        return {
            ok: false,
            message: "No webhookId"
        }
    }
}