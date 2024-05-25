import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

// dtos
import { CreateOrderDto } from './dto/create-order.dto';

// repository
import { ServiceRepository } from '../service/service.repository';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly repo: OrderRepository,
    private readonly serviceRepo: ServiceRepository,
  ) {}

  async create({ serviceId, ...data }: CreateOrderDto) {
    const service = await this.serviceRepo.findOne({
      where: { id: serviceId },
    });

    if (!service) {
      throw new BadRequestException({ serviceId: 'Service not found' });
    }

    const order = this.repo.create(data);
    order.service = service;

    return this.repo.save(order);
  }

  async findAll({
    params: { coordinatesFrom, coordinatesTo },
  }: {
    params: { coordinatesFrom: string; coordinatesTo: string };
  }) {
    const [latitudeNe, longitudeNe] = coordinatesFrom?.split('|') || [];
    const [latitudeSw, longitudeSw] = coordinatesTo?.split('|') || [];
    const queryBuilder = this.repo.createQueryBuilder('order');

    if (coordinatesFrom && coordinatesTo) {
      queryBuilder
        .where('latitude <= :latitudeNe', { latitudeNe })
        .andWhere('latitude >= :latitudeSw', { latitudeSw })
        .andWhere('longitude <= :longitudeNe', { longitudeNe })
        .andWhere('longitude >= :longitudeSw', { longitudeSw });
    }

    queryBuilder.relation('service');
    const result = await queryBuilder.getMany();

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
