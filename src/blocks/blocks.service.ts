import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block } from './entities/block.entity';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { ExportBlockDto, SearchBlockDto } from './dto/get-block.dto';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  async create(createBlockDto: CreateBlockDto, file?: Express.Multer.File) {
    try {
      const block = this.blockRepository.create(createBlockDto);
      if (file) {
        const imageCloudinary = await this.cloudinaryService.uploadFile(file, 'image');
        block.image = imageCloudinary.secure_url;
        block.imagePublicId = imageCloudinary.public_id;
      }

      await this.blockRepository.save(block);

      return { block };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(params: SearchBlockDto) {
    try {
      const skip = (params.page - 1) * params.pageSize;

      const query = this.blockRepository.createQueryBuilder('b')
        .select([
          'b.id', 'b.order', 'b.type', 'b.provider', 'b.identifier', 'b.content',
          'b.image', 'b.imagePublicId', 'b.details', 'b.isActive'
        ])
        .where('(b.publication_id = :publication)', { publication: params.publication_id });

      if (params.searcher != '') {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(`(LOWER(b.identifier) LIKE LOWER(:search))`, { search: `%${params.searcher}%` });
          })
        );
      }

      if (params.active && !params.inactive) {
        query.andWhere(`(b.isActive = :val)`, { val: true });
      }

      if (!params.active && params.inactive) {
        query.andWhere(`(b.isActive = :val1)`, { val1: false });
      }

      if (params.inactive && params.active) {
        query.andWhere(`(b.isActive = :active OR b.isActive = :inactive)`, { active: true, inactive: false });
      }

      const desc = (params.descending) ? 'DESC' : 'ASC';
      const sort = `b.${params.sort_by}`;
      query.orderBy(sort, desc);

      const [blocks, total] = await Promise.all([
        query.skip(skip).take(params.pageSize).getMany(),
        query.getCount()
      ]);

      return { blocks, total };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllExport(params: ExportBlockDto) {
    try {
      const query = this.blockRepository.createQueryBuilder('p')
        .select([
          'b.id', 'b.order', 'b.type', 'b.provider', 'b.identifier', 'b.content',
          'b.image', 'b.imagePublicId', 'b.details', 'b.isActive'
        ])
        .where('(b.publication_id = :publication)', { publication: params.publication_id });

      const blocks = await query.getMany();
      return { blocks };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateBlockDto: UpdateBlockDto, file?: Express.Multer.File) {
    try {
      const block = await this.blockRepository.preload({ id, ...updateBlockDto });
      if (block) {
        if (file) {
          await this.cloudinaryService.deleteImage(block.imagePublicId);

          const imageCloudinary = await this.cloudinaryService.uploadFile(file, 'image');
          block.image = imageCloudinary.secure_url;
          block.imagePublicId = imageCloudinary.public_id;
        }

        await this.blockRepository.save(block);
        return { block };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
