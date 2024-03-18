import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// entity
import { Service } from './entities/service.entity';

export class ServiceRepository extends Repository<Service> {
  constructor(
    @InjectRepository(Service)
    private readonly repository: Repository<Service>,
  ) {
    super(Service, repository.manager);
  }
}
