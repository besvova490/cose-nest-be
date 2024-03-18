import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

// entities
import { Document } from './entity/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
  ) {}

  async create(data: Partial<Document>) {
    return this.repository.save(data);
  }

  async findOne({ id, url }: { id?: number; url?: string }) {
    const document = await this.repository.findOne({
      where: [{ id, url }],
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async delete(id: number) {
    const document = await this.repository.delete(id);

    if (!document.affected) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
