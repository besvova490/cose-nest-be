import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

// entity
import { AbstractEntity } from '../../../entity/abstract-entity.entity';
import { User } from '../../user/entities/user.entity';
import { Service } from '../../service/entities/service.entity';
import { Review } from '../../review/entities/review.entity';

// helpers
import { USER_ROLES } from '../../../constants';

@Entity()
export class Profile extends AbstractEntity {
  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isTwoFactorAuthEnabled: boolean;

  @Column({ nullable: true })
  twoFactorAuthSecret: string;

  @Column({ nullable: false })
  role: USER_ROLES;

  @OneToOne(() => User, (user) => user.profile, { cascade: true })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Service, (service) => service.serviceChampions)
  @JoinTable()
  services: Service[];

  @ManyToMany(() => Service, (service) => service.serviceParticipators)
  @JoinTable()
  requestedServices: Service[];

  @ManyToOne(() => Review, (review) => review.reviewed)
  feedbacks: Review[];

  @ManyToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];
}
