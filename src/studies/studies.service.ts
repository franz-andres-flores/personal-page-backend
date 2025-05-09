import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { Study } from './entities/study.entity';
import { SearchDto } from 'src/common/dtos';

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study)
    private readonly studyRepository: Repository<Study>
  ) { }

  async create(createStudyDto: CreateStudyDto) {
    try {
      const study = this.studyRepository.create(createStudyDto);
      await this.studyRepository.save(study);

      return { study };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(params: SearchDto) {
    try {
      const skip = (params.page - 1) * params.pageSize;

      const query = this.studyRepository.createQueryBuilder('s')
        .select([
          's.id', 's.school', 's.carrer', 's.start_year', 's.end_year',
          's.description', 's.isActive'
        ]);

      if (params.searcher != '') {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(`(LOWER(s.school) LIKE LOWER(:search))`, { search: `%${params.searcher}%` })
              .orWhere(`(LOWER(s.carrer) LIKE LOWER(:search))`, { search: `%${params.searcher}%` });
          })
        );
      }

      // if (params.active == 'true' && params.inactive == 'false') {
      //   query.andWhere(`(s.isActive = :val)`, { val: true });
      // }

      // if (params.inactive == 'true' && params.active == 'false') {
      //   query.andWhere(`(s.isActive = :val1)`, { val1: false });
      // }

      // if (params.inactive == 'true' && params.active == 'true') {
      //   query.andWhere(`(s.isActive = :active OR s.isActive = :inactive)`, { active: true, inactive: false });
      // }

      const desc = (params.descending) ? 'DESC' : 'ASC';
      const sort = `s.${params.sort_by}`;
      query.orderBy(sort, desc);

      const [studies, total] = await Promise.all([
        query.skip(skip).take(params.pageSize).getMany(),
        query.getCount()
      ]);

      return { studies, total };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateStudyDto: UpdateStudyDto) {
    try {
      const study = await this.studyRepository.preload({ id: id, ...updateStudyDto });
      if (study) {
        await this.studyRepository.save(study);
        return { study };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
