import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { DataSource, In } from 'typeorm';

// dtos
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

// services
import { ProfileService } from '../profile/profile.service';

// repositories
import { ServiceRepository } from './service.repository';

// entities
import { Document } from '../document/entity/document.entity';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    private dataSource: DataSource,
    private readonly serviceRepository: ServiceRepository,
    private readonly profileService: ProfileService,
  ) {}

  async create(data: CreateServiceDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const logo = await queryRunner.manager.save(Document, { url: data.logo });
      const service = queryRunner.manager.create(Service, {
        ...data,
        logo,
      });

      await queryRunner.manager.save(Service, service);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.serviceRepository.find({
      relations: ['logo'],
    });
  }

  async findOne(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    Object.assign(service, updateServiceDto);

    return this.serviceRepository.save(service);
  }

  async addChampion(services: number[], userId: number) {
    const servicesToAdd = await this.serviceRepository.find({
      where: { id: In(services) },
      select: ['id'],
    });

    return this.profileService.update(userId, {
      services: [...servicesToAdd.map((item) => item.id)],
    });
  }

  async remove(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return this.serviceRepository.remove(service);
  }
}
