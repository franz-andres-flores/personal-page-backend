import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { Publication } from './entities/publication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publication]),
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule { }
