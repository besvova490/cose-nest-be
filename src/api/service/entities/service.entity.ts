import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

// entities
import { AbstractEntity } from '../../../entity/abstract-entity.entity';
import { Document } from '../../document/entity/document.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Service extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => Document, { cascade: true })
  @JoinColumn()
  logo: Document;

  @ManyToMany(() => Profile)
  @JoinTable()
  serviceChampions: Profile[];

  @OneToMany(() => Order, (order) => order.service)
  orders: Order[];
}
