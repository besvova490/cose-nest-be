import { Controller, Get, Post, Body, Param } from '@nestjs/common';

// services
import { EventStoreService } from './event-store.service';

@Controller()
export class EventStoreController {
  constructor(private eventStoreService: EventStoreService) {}

  @Get()
  getStoredEventsList() {
    return this.eventStoreService.findAll();
  }

  @Get(':id')
  getStoredEvent(@Param('id') id: string) {
    return this.eventStoreService.findOne(id);
  }

  @Post('/restore')
  restoreEvent(@Body() body: { events: string[] }) {
    return this.eventStoreService.restore(body.events);
  }
}
