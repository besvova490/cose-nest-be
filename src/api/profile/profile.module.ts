import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// modules
import { EventStoreModule } from '../event-store/event-store.module';
import { EventStoreService } from '../event-store/event-store.service';

// repositories
import { ProfileRepository } from './profile.repository';
import { ServiceRepository } from '../service/service.repository';

// entities
import { Profile } from './entities/profile.entity';
import { Service } from '../service/entities/service.entity';
import { Event } from '../event-store/schemas/event.schema';

// services
import { ProfileService } from './profile.service';

// subscribers
import { ProfileSubscriber } from './profile.subscriber';

// controllers
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile,
      Service,
      ProfileRepository,
      ServiceRepository,
    ]),
    TypeOrmModule.forFeature([Event], 'mongo'),
    EventStoreModule,
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    ServiceRepository,
    ProfileSubscriber,
    EventStoreService,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
