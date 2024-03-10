import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { User } from './entities/user.entity';

// repository
import { UserRepository } from './user.repository';

// service
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
