import { Controller, Get, Param } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('sessions/:sessionId/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get("WA")
  findById(@Param("sessionId") sessionId:string) {
    return this.groupService.findAll(sessionId);
  }
}
