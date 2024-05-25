import { Injectable, BadRequestException } from '@nestjs/common';
import { FindOneOptions, In } from 'typeorm';

// entities
import { Profile } from './entities/profile.entity';

// repository
import { ServiceRepository } from '../service/service.repository';
import { ProfileRepository } from './profile.repository';

// dtos
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly repo: ProfileRepository,
    private readonly serviceRepo: ServiceRepository,
  ) {}
  async findMe(id: number) {
    const resp = await this.repo.findOne({
      where: { id },
      relations: ['services', 'user'],
    });

    return resp;
  }

  findAll({ id }: { id?: number }) {
    return this.repo.find({ where: { id } });
  }

  findOne(id: number, options?: FindOneOptions<Profile>) {
    return this.repo.findOne({
      where: { id },
      ...options,
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!profile) {
      throw new BadRequestException('User not found');
    }

    Object.assign(profile, updateProfileDto);

    if (updateProfileDto.services) {
      const services = await this.serviceRepo.find({
        where: { id: In(updateProfileDto.services) },
      });

      profile.services = services;
      profile.updatedAt = new Date();
    }

    return this.repo.save(profile);
  }

  async remove(id: number) {
    const profile = await this.repo.findOne({ where: { id } });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    return this.repo.remove(profile);
  }
}
