import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum OperationType {
  update = 'update',
  delete = 'delete',
}

@Entity()
export class Event {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ nullable: false })
  recordId: number;

  @Column({ nullable: false })
  data: string;

  @Column({ nullable: false })
  eventType: OperationType;

  @Column({ nullable: false })
  model: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
