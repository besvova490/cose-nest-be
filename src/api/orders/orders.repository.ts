import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// services
import { EventStoreService } from '../event-store/event-store.service';

// entity
import { Order } from './entities/order.entity';

export class OrderRepository extends Repository<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    private eventStoreService: EventStoreService,
  ) {
    super(Order, repository.manager);
  }
}
