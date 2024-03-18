import { Injectable } from '@nestjs/common';
import {
  EntitySubscriberInterface,
  UpdateEvent,
  EventSubscriber,
  Connection,
} from 'typeorm';

// entities
import { Profile } from './entities/profile.entity';

// services
import { EventStoreService } from '../event-store/event-store.service';

// constants
import { OperationType } from '../event-store/schemas/event.schema';

@Injectable()
@EventSubscriber()
export class ProfileSubscriber implements EntitySubscriberInterface {
  constructor(
    private readonly eventStore: EventStoreService,
    private readonly connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Profile;
  }

  async beforeUpdate(event: UpdateEvent<Profile>) {
    if (event.databaseEntity && !event.entity.isRestoreOperation) {
      await this.eventStore.create({
        recordId: event.databaseEntity.id,
        data: JSON.stringify({
          ...event.databaseEntity,
          createdAt: undefined,
          updatedAt: undefined,
          id: undefined,
        }),
        createdAt: new Date(),
        eventType: OperationType.update,
        model: event.databaseEntity.constructor.name,
      });
    }
  }
}
