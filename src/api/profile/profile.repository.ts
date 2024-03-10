import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// helpers
import { BaseRepository } from 'src/repository/base-repository.repository';

// entity
import { Profile } from './entities/profile.entity';

// services
import { EventStoreService } from '../event-store/event-store.service';

export class ProfileRepository extends BaseRepository<Profile> {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
  ) {
    super(Profile, repository.manager, EventStoreService as any);
  }
}
