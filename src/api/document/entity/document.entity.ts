import { Entity, Column, ManyToOne } from 'typeorm';

// entity
import { AbstractEntity } from '../../../entity/abstract-entity.entity';
import { Review } from '../../review/entities/review.entity';

@Entity()
export class Document extends AbstractEntity {
  @Column()
  url: string;

  @ManyToOne(() => Review, (review) => review.attachments)
  review: Review;
}
