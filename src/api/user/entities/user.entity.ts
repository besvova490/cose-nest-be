import { Entity, Column, OneToOne } from 'typeorm';

// entity
import { Profile } from '../../profile/entities/profile.entity';
import { AbstractEntity } from '../../../entity/abstract-entity.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
