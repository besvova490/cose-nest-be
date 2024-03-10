import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// repository
import { UserRepository } from '../user/user.repository';

// entities
import { User } from '../user/entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';

// services
import { AuthService } from './auth.service';

// controllers
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, UserRepository]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
