import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

// entities
import { AbstractEntity } from '../../../entity/abstract-entity.entity';
import { Document } from '../../document/entity/document.entity';
import { Service } from '../../service/entities/service.entity';
import { Profile } from '../../profile/entities/profile.entity';

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
  DECLINED = 'declined',
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
  @Column({ nullable: false, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  paymentType: OrderPaymentType;

  @Column({ nullable: false, default: OrderPaymentStatus.PENDING })
  paymentStatus: OrderPaymentStatus;

  @Column({ nullable: false })
  orderDate: Date;

  @Column('decimal', { precision: 10, scale: 6, nullable: false })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6, nullable: false })
  longitude: number;

  @OneToOne(() => Document, { cascade: true })
  @JoinColumn()
  orderConfirmation: Document;

  @ManyToOne(() => Service, (service) => service.orders)
  service: Service;

  @ManyToOne(() => Profile, (profile) => profile.requestedOrders)
  serviceRequester: Profile;

  @ManyToOne(() => Profile, (profile) => profile.acceptedOrders)
  serviceChampion: Profile;
}
