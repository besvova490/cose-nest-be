import {
  Repository,
  DeepPartial,
  FindOneOptions,
  ObjectType,
  EntityManager,
} from 'typeorm';

// entity
import { AbstractEntity } from '../entity/abstract-entity.entity';

// services
import { EventStoreService } from '../api/event-store/event-store.service';

// helpers
import { OperationType } from '../api/event-store/schemas/event.schema';

export class BaseRepository<T> extends Repository<T> {
  constructor(
    entity: ObjectType<T>,
    manager: EntityManager,
    public eventStoreService?: EventStoreService,
  ) {
    super(entity, manager);
  }

  async save<D extends DeepPartial<T>>(entity: D) {
    const oldData = await super.findOne({
      where: { id: (entity as AbstractEntity).id },
    } as unknown as FindOneOptions<T>);

    // this.eventStoreService.create({
    //   data: JSON.stringify(oldData),
    //   createdAt: new Date(),
    //   eventType: OperationType.update,
    //   model: 'er',
    // });
    console.log('oldData', oldData, this.manager);

    return super.save(entity);
  }
}
