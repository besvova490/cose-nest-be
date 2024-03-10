import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

// repositories
import { UserRepository } from './user.repository';

// dto
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async create({ email, password }: CreateUserDto) {
    const isUserExist = await this.repo.exists({ where: { email } });

    if (isUserExist) {
      throw new BadRequestException('User already exists');
    }

    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne({ id, email }: { id?: number; email?: string }) {
    return this.repo.findOne({ where: { id, email }, relations: ['profile'] });
  }

  async findAll() {
    return this.repo.find();
  }

  async update(id: number, { email, password }: CreateUserDto) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.repo.save({ ...user, email, password });
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.repo.softRemove(user);
  }
}
