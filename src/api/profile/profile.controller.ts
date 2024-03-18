import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

// service
import { ProfileService } from './profile.service';

// entities
import { User } from '../user/entities/user.entity';

// guards
import { AuthGuard } from '../../guards/auth.guard';

// dtos
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

// decorators
import { CurrentUser } from '../../decorators/current-user.decorator';

// interceptors
import { Serialize } from '../../interceptors/serialize.interceptor';

@UseGuards(AuthGuard)
@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Serialize(ProfileDto)
  @Get()
  findMe(@CurrentUser() user: User) {
    return this.profileService.findMe(user.profile.id);
  }

  @Serialize(ProfileDto)
  @Patch()
  update(
    @CurrentUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(user.profile.id, updateProfileDto);
  }

  @Delete()
  remove(@CurrentUser() user: User) {
    return this.profileService.remove(user.profile.id);
  }
}
