import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// modules
import { DocumentModule } from '../document/document.module';
import { ProfileModule } from '../profile/profile.module';

// services
import { ServiceService } from './service.service';

// controllers
import { ServiceController } from './service.controller';

// repositories
import { ServiceRepository } from './service.repository';

// entities
import { Service } from './entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, ServiceRepository]),
    DocumentModule,
    ProfileModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  exports: [ServiceService],
})
export class ServiceModule {}
