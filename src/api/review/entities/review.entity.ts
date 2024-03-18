import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';

// entities
import { AbstractEntity } from '../../../entity/abstract-entity.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Document } from '../../document/entity/document.entity';

@Entity()
export class Review extends AbstractEntity {
  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: true })
  message: string;

  @OneToMany(() => Document, (document) => document.review, { cascade: true })
  @JoinColumn()
  attachments: Document[];

  @ManyToOne(() => Profile, (profile) => profile.feedbacks)
  reviewed: Profile;

  @ManyToMany(() => Profile, (profile) => profile.reviews)
  @JoinTable()
  reviewer: Profile;
}
