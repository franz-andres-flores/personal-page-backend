import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { SearchDto } from 'src/common/dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  async create(createCategoryDto: CreateCategoryDto, file?: Express.Multer.File) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      if (file) {
        const imageCloudinary = await this.cloudinaryService.uploadFile(file, 'image');
        category.image = imageCloudinary.secure_url;
        category.imagePublicId = imageCloudinary.public_id;
      }

      await this.categoryRepository.save(category);

      return { category };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(params: SearchDto) {
    try {
      const skip = (params.page - 1) * params.pageSize;

      const query = this.categoryRepository.createQueryBuilder('c')
        .select([
          'c.id', 'c.name', 'c.description', 'c.image', 'c.isActive'
        ]);

      if (params.searcher != '') {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(`(LOWER(c.name) LIKE LOWER(:search))`, { search: `%${params.searcher}%` });
          })
        );
      }

      if (params.active && !params.inactive) {
        query.andWhere(`(c.isActive = :val)`, { val: true });
      }

      if (!params.active && params.inactive) {
        query.andWhere(`(c.isActive = :val1)`, { val1: false });
      }

      if (params.inactive && params.active) {
        query.andWhere(`(c.isActive = :active OR c.isActive = :inactive)`, { active: true, inactive: false });
      }

      const desc = (params.descending) ? 'DESC' : 'ASC';
      const sort = `c.${params.sort_by}`;
      query.orderBy(sort, desc);

      const [categories, total] = await Promise.all([
        query.skip(skip).take(params.pageSize).getMany(),
        query.getCount()
      ]);

      return { categories, total };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllExport() {
    try {
      const query = this.categoryRepository.createQueryBuilder('c')
        .select([
          'c.id', 'c.name', 'c.description', 'c.image',
          'c.imagePublicId', 'c.isActive'
        ]);

      const categories = await query.getMany();
      return { categories };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, file: Express.Multer.File) {
    try {
      const category = await this.categoryRepository.preload({ id: id, ...updateCategoryDto });
      if (category) {
        if (file) {
          await this.cloudinaryService.deleteImage(category.imagePublicId);

          const imageCloudinary = await this.cloudinaryService.uploadFile(file, 'image');
          category.image = imageCloudinary.secure_url;
          category.imagePublicId = imageCloudinary.public_id;
        }

        await this.categoryRepository.save(category);
        return { category };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
