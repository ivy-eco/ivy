import { DynamicModule, Global, Module } from '@nestjs/common';
import { BaseHttpService } from './services/base-http.service';
import { MessagesService } from './services/messages.service';
import { SessionsService } from './services/sessions.service';
import { WebhooksService } from './services/webhooks.service';
import { GroupsService } from './services/groups.service';
import { OpenWAConfig } from './interfaces/options.interface';

@Global()
@Module({})
export class OpenWaModule {
    static register(options: OpenWAConfig): DynamicModule {
        return {
            module: OpenWaModule,
            providers: [
                {
                    provide: 'OPENWA_OPTIONS',
                    useValue: options,
                },
                BaseHttpService,
                SessionsService,
                WebhooksService,
                MessagesService,
                GroupsService,
            ],
            exports: [
                SessionsService, 
                WebhooksService, 
                MessagesService,
                GroupsService,
            ],
        };
    }

    static registerAsync(
        options: { 
            inject?: any[]; 
            useFactory: (...args: any[]) => Promise<OpenWAConfig> | OpenWAConfig;}
    ): DynamicModule {
        return {
            module: OpenWaModule,
            imports: [], 
            providers: [
                {
                    provide: 'OPENWA_OPTIONS',
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                BaseHttpService,
                SessionsService,
                WebhooksService,
                MessagesService,
                GroupsService,
            ],
            exports: [
                SessionsService, 
                WebhooksService, 
                MessagesService,
                GroupsService,
            ],
        };
    }
}