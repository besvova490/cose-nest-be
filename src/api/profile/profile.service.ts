import { Injectable, BadRequestException } from '@nestjs/common';

// repository
import { ProfileRepository } from './profile.repository';
import { UserRepository } from '../user/user.repository';

// dtos
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly repo: ProfileRepository,
    private readonly userRepo: UserRepository,
  ) {}
  findMe(id: number) {
    return this.userRepo.findOne({ where: { id }, relations: ['profile'] });
  }

  findAll({ id }: { id?: number }) {
    return this.repo.find({ where: { id } });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    Object.assign(user.profile, updateProfileDto);

    const result = await this.repo.save(user.profile);

    return {
      ...user,
      profile: result,
    };
  }

  async remove(id: number) {
    const profile = await this.repo.findOne({ where: { id } });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    return this.repo.remove(profile);
  }
}
