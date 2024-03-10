import { Controller, Get } from '@nestjs/common';

// services
import { EventStoreService } from './event-store.service';

@Controller()
export class EventStoreController {
  constructor(private messagesService: EventStoreService) {}

  @Get()
  getRoomMessages() {
    return this.messagesService.findAll();
  }
}
