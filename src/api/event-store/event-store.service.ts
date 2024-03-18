import { Injectable, BadRequestException, Global } from '@nestjs/common';
import { Repository, FindOneOptions, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// schemas
import { Event } from './schemas/event.schema';

@Global()
@Injectable()
export class EventStoreService {
  constructor(
    @InjectRepository(Event, 'mongo')
    private eventModel: Repository<Event>,
    private dataSource: DataSource,
  ) {}

  async create(event: Event) {
    return this.eventModel.save(event);
  }

  async findAll(): Promise<Event[]> {
    const events = await this.eventModel.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return events.map((event) => ({
      ...event,
      data: JSON.parse(event.data),
    }));
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findOne(id as FindOneOptions<Event>);

    return {
      ...event,
      data: JSON.parse(event.data),
    };
  }

  async restore(events: string[]) {
    const eventsData = await this.eventModel.findByIds(events);

    if (!eventsData.length) {
      throw new BadRequestException('No events found');
    }

    const promises = eventsData.map(async (event) => {
      const updateData = JSON.parse(event.data);
      const repo = this.dataSource.getRepository(event.model);

      const entity = {
        ...updateData,
        id: event.recordId,
        isRestoreOperation: true,
      };
      repo.save(entity);

      await this.eventModel.delete(event._id);
    });

    await Promise.all(promises);
  }
}
