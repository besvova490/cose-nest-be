import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// services
import { OrdersService } from './orders.service';

// controllers
import { OrdersController } from './orders.controller';

// entities
import { Service } from '../service/entities/service.entity';
import { ServiceRepository } from '../service/service.repository';
import { Event } from '../event-store/schemas/event.schema';
import { Order } from './entities/order.entity';
import { OrderRepository } from './orders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderRepository,
      Service,
      ServiceRepository,
    ]),
    TypeOrmModule.forFeature([Event], 'mongo'),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, ServiceRepository],
})
export class OrdersModule {}
