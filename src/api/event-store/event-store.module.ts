import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// services
import { EventStoreService } from './event-store.service';

// controllers
import { EventStoreController } from './event-store.controller';

// schemas
import { Event } from './schemas/event.schema';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Event], 'mongo')],
  controllers: [EventStoreController],
  providers: [EventStoreService],
  exports: [EventStoreService],
})
export class EventStoreModule {}
