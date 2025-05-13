import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { SearchDto } from 'src/common/dtos';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>
  ) { }

  async create(createSectionDto: CreateSectionDto) {
    try {
      const category = this.sectionRepository.create(createSectionDto);
      await this.sectionRepository.save(category);

      return { category };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(params: SearchDto) {
    try {
      const skip = (params.page - 1) * params.pageSize;

      const query = this.sectionRepository.createQueryBuilder('s')
        .leftJoinAndSelect('s.category', 'c')
        .select([
          's.id', 's.name', 's.description', 's.isActive',
          'c.id', 'c.name'
        ]);

      if (params.searcher != '') {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(`(LOWER(s.name) LIKE LOWER(:search))`, { search: `%${params.searcher}%` });
          })
        );
      }

      if (params.active && !params.inactive) {
        query.andWhere(`(s.isActive = :val)`, { val: true });
      }

      if (!params.active && params.inactive) {
        query.andWhere(`(s.isActive = :val1)`, { val1: false });
      }

      if (params.inactive && params.active) {
        query.andWhere(`(s.isActive = :active OR s.isActive = :inactive)`, { active: true, inactive: false });
      }

      const desc = (params.descending) ? 'DESC' : 'ASC';
      const sort = `s.${params.sort_by}`;
      query.orderBy(sort, desc);

      const [sections, total] = await Promise.all([
        query.skip(skip).take(params.pageSize).getMany(),
        query.getCount()
      ]);

      return { sections, total };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllExport() {
    try {
      const query = this.sectionRepository.createQueryBuilder('s')
        .leftJoinAndSelect('s.category', 'c')
        .select([
          's.id', 's.name', 's.description', 's.isActive',
          'c.id', 'c.name'
        ]);

      const sections = await query.getMany();
      return { sections };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    try {
      const section = await this.sectionRepository.preload({ id: id, ...updateSectionDto });
      if (section) {
        await this.sectionRepository.save(section);
        return { section };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
