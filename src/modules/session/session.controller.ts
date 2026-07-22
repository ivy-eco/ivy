import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionService } from './session.service';
import { UpdateSessionDto } from './dto/update-session.dto';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
  ) {}

  @Get("/registered")
  getRegistered() {
    return this.sessionService.getRegistered();
  }

  @Post()
  create(@Body() cSDto: CreateSessionDto) {
    return this.sessionService.create(cSDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(+id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionService.remove(+id);
  }

  @Get('/WA/:id')
  findOneWA(@Param('id') id: string) {
    return this.sessionService.findOneWA(id);
  }
}
