import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// services
import { EventStoreService } from '../event-store/event-store.service';

// entity
import { Profile } from './entities/profile.entity';

export class ProfileRepository extends Repository<Profile> {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
    private eventStoreService: EventStoreService,
  ) {
    super(Profile, repository.manager);
  }
}
