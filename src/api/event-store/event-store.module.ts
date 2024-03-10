import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// services
import { EventStoreService } from './event-store.service';

// controllers
import { EventStoreController } from './messages.controller';

// schemas
import { Event, EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventStoreController],
  providers: [EventStoreService],
  exports: [EventStoreService],
})
export class EventStoreModule {}
