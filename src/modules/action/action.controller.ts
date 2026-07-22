import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type ActionReq, ActionService } from './action.service';

@Controller('sessions/:sessionId/actions')
export class ActionController {
    constructor(
        private readonly actionS: ActionService,
    ) { }

    @Post()
    async create(@Param("sessionId") sessionId, @Body() body: ActionReq) {
        return this.actionS.create(sessionId, body);
    }

    @Get()
    getBySessionId(@Param("sessionId") sessionId){
        return this.actionS.getBySessionId(sessionId);
    }
}