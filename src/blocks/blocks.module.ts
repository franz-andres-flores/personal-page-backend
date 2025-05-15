import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { Block } from './entities/block.entity';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Block]),
    CloudinaryModule
  ],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule { }
