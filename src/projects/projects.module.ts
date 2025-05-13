import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    CloudinaryModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule { }
