import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// repositories
import { ProfileRepository } from './profile.repository';
import { UserRepository } from '../user/user.repository';

// modules
import { UserModule } from '../user/user.module';

// entities
import { Profile } from './entities/profile.entity';
import { User } from '../user/entities/user.entity';

// services
import { ProfileService } from './profile.service';

// controllers
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile,
      User,
      ProfileRepository,
      UserRepository,
    ]),
    UserModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UserRepository, ProfileRepository],
})
export class ProfileModule {}
