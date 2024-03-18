import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// services
import { DocumentService } from './document.service';

// entities
import { Document } from './entity/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
