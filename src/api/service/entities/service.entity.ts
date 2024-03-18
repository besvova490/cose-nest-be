import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

// entities
import { AbstractEntity } from '../../../entity/abstract-entity.entity';
import { Document } from '../../document/entity/document.entity';
import { Profile } from '../../profile/entities/profile.entity';

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
  serviceParticipators: Profile[];

  @ManyToMany(() => Profile)
  @JoinTable()
  serviceChampions: Profile[];
}
