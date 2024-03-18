import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

// entities
import { AbstractEntity } from '../../../entity/abstract-entity.entity';
import { Document } from '../../document/entity/document.entity';

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
}

export enum OrderPaymentType {
  CASH = 'cash',
  CARD = 'card',
}

export enum OrderPaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

@Entity()
export class Order extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  ref: string;

  @Column({ nullable: false, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: false })
  paymentType: OrderPaymentType;

  @Column({ nullable: false, default: OrderPaymentStatus.PENDING })
  paymentStatus: OrderPaymentStatus;

  @OneToOne(() => Document, { cascade: true })
  @JoinColumn()
  orderConfirmation: Document;
}
