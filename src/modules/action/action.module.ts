import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Action } from './entities/action.entity';
import { ExtFunction } from '../extension/entities/ext-function.entity';
import { ActionFunction } from './entities/action-function.entity';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { Extension } from '../extension/entities/extension.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Extension,
      Action, 
      ExtFunction,
      ActionFunction,
    ]),
    HttpModule
  ],
  controllers: [ActionController],
  providers: [
    ActionService,
  ],
})
export class ActionModule {}
