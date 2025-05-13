import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { ProjectImage } from './interfaces';
import { SearchDto } from 'src/common/dtos';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  async create(createProjectDto: CreateProjectDto, files: Express.Multer.File[]) {
    try {
      const project = this.projectRepository.create(createProjectDto);
      const imageUrls: ProjectImage[] = [];
      if (files && files.length > 0) {
        const uploadedImages = await Promise.all(
          files.map(file => this.cloudinaryService.uploadFile(file, "image")),
        );

        uploadedImages.map(img => {
          const imageUrl: ProjectImage = {
            image: img.secure_url,
            imagePublicId: img.public_id
          }

          imageUrls.push(imageUrl);
        });

        project.images = imageUrls as any;
      }


      await this.projectRepository.save(project);

      return { project };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(params: SearchDto) {
    try {
      const skip = (params.page - 1) * params.pageSize;

      const query = this.projectRepository.createQueryBuilder('p')
        .select([
          'p.id', 'p.name', 'p.description', 'p.technologies', 'p.urlRepository',
          'p.images', 'p.isActive'
        ]);

      if (params.searcher != '') {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(`(LOWER(p.name) LIKE LOWER(:search))`, { search: `%${params.searcher}%` });
          })
        );
      }

      if (params.active && !params.inactive) {
        query.andWhere(`(p.isActive = :val)`, { val: true });
      }

      if (!params.active && params.inactive) {
        query.andWhere(`(p.isActive = :val1)`, { val1: false });
      }

      if (params.inactive && params.active) {
        query.andWhere(`(p.isActive = :active OR p.isActive = :inactive)`, { active: true, inactive: false });
      }

      const desc = (params.descending) ? 'DESC' : 'ASC';
      const sort = `p.${params.sort_by}`;
      query.orderBy(sort, desc);

      const [projects, total] = await Promise.all([
        query.skip(skip).take(params.pageSize).getMany(),
        query.getCount()
      ]);

      return { projects, total };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllExport() {
    try {
      const query = this.projectRepository.createQueryBuilder('p')
        .select([
          'p.id', 'p.name', 'p.description', 'p.technologies', 'p.urlRepository',
          'p.images', 'p.isActive'
        ]);

      const projects = await query.getMany();
      return { projects };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, files: Express.Multer.File[]) {
    try {
      const project = await this.projectRepository.preload({ id: id, ...updateProjectDto });
      const imageUrls: ProjectImage[] = [];
      if (project) {
        if (updateProjectDto.deleteImages && updateProjectDto.deleteImages.length > 0) {
          for (const image of updateProjectDto.deleteImages) {
            await this.cloudinaryService.deleteImage(image.imagePublicId);

            const indexImage = project.images.findIndex(x => x.image == image.image);
            if (indexImage != -1) {
              project.images.splice(indexImage, 1);
            }
          }
        }

        if (files && files.length > 0) {
          const uploadedImages = await Promise.all(
            files.map(file => this.cloudinaryService.uploadFile(file, "image")),
          );

          uploadedImages.map(img => {
            const imageUrl: ProjectImage = {
              image: img.secure_url,
              imagePublicId: img.public_id
            }

            imageUrls.push(imageUrl);
          });

          project.images = imageUrls as any;
        }

        await this.projectRepository.save(project);
      }
      return { project };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
