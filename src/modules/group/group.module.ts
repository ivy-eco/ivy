import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
