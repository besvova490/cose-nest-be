import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// entity
import { User } from './entities/user.entity';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(User, repository.manager);
  }
}
