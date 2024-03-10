import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum OperationType {
  update = 'update',
  delete = 'delete',
}

@Schema()
export class Event {
  @Prop({ required: true, default: null })
  data: string;

  @Prop({ required: false, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: null })
  eventType: OperationType;

  @Prop({ required: true, default: null })
  model: string;
}

export type EventDocument = HydratedDocument<Event>;
export const EventSchema = SchemaFactory.createForClass(Event);
