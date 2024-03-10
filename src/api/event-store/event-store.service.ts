import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// schemas
import { Event } from './schemas/event.schema';

@Injectable()
export class EventStoreService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(event: Event): Promise<Event> {
    const createdEvent = new this.eventModel(event);

    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    const events = await this.eventModel.find().exec();

    return events.map((event) => ({
      ...event.toJSON(),
      data: JSON.parse(event.data),
    }));
  }
}
