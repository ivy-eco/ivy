import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

import { OpenWaModule } from '@ivy-eco/sdk';

import { validationSchema } from './env.validation';

import { SessionModule } from './modules/session/session.module';
import { Session } from './modules/session/entities/session.entity';

import { ExtensionsModule } from './modules/extension/extension.module';
import { Extension } from './modules/extension/entities/extension.entity';
import { ExtFunction } from './modules/extension/entities/ext-function.entity';

import { ActionModule } from './modules/action/action.module';
import { Action } from './modules/action/entities/action.entity';
import { ActionFunction } from './modules/action/entities/action-function.entity';

import { GroupModule } from './modules/group/group.module';
import { Group } from './modules/group/entities/group.entity';

import { extensionsList } from './extensions.list';
import { ActionGroup } from './modules/action/entities/action-group.entity';
import { ExtensionDefinition } from './modules/extension/extension.interface';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    OpenWaModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiKey: config.get<string>("API_KEY") || '',
        whatsappUrl: config.get<string>("WHATSAPP_URL") || '',
      })
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow("DATABASE_HOST"),
        port: configService.getOrThrow("DATABASE_PORT"),
        database: configService.getOrThrow("DATABASE_NAME"),
        username: configService.getOrThrow("DATABASE_USERNAME"),
        password: configService.getOrThrow("DATABASE_PASSWORD"),
        entities: [
          Session,
          Action, ActionFunction, ActionGroup,
          Extension, ExtFunction,
          Group
        ],
        synchronize: true,
      })
    }),
    SessionModule,
    ActionModule,
    GroupModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'dashboard', 'dist'),
    })
  ],
})
export class AppModule {
  static register(extensions: ExtensionDefinition[]): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ExtensionsModule.forRoot(extensions),
      ],
    };
  }
}
