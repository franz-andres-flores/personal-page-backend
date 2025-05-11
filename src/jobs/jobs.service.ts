import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { SearchDto } from 'src/common/dtos';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>
  ) { }

  async create(createJobDto: CreateJobDto) {
    try {
      const job = this.jobRepository.create(createJobDto);
      await this.jobRepository.save(job);

      return { job };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(params: SearchDto) {
    try {
      const skip = (params.page - 1) * params.pageSize;

      const query = this.jobRepository.createQueryBuilder('j')
        .select([
          'j.id', 'j.company', 'j.position', 'j.start_month', 'j.start_year',
          'j.end_month', 'j.end_year', 'j.description', 'j.isActive'
        ]);

      if (params.searcher != '') {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(`(LOWER(j.company) LIKE LOWER(:search))`, { search: `%${params.searcher}%` });
          })
        );
      }

      if (params.active && !params.inactive) {
        query.andWhere(`(j.isActive = :val)`, { val: true });
      }

      if (!params.active && params.inactive) {
        query.andWhere(`(j.isActive = :val1)`, { val1: false });
      }

      if (params.inactive && params.active) {
        query.andWhere(`(j.isActive = :active OR j.isActive = :inactive)`, { active: true, inactive: false });
      }

      const desc = (params.descending) ? 'DESC' : 'ASC';
      const sort = `j.${params.sort_by}`;
      query.orderBy(sort, desc);

      const [jobs, total] = await Promise.all([
        query.skip(skip).take(params.pageSize).getMany(),
        query.getCount()
      ]);

      return { jobs, total };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllExport() {
    try {
      const query = this.jobRepository.createQueryBuilder('j')
        .select([
          'j.id', 'j.company', 'j.position', 'j.start_month', 'j.start_year',
          'j.end_month', 'j.end_year', 'j.description', 'j.isActive'
        ]);

      const jobs = await query.getMany();
      return { jobs };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    try {
      const job = await this.jobRepository.preload({ id: id, ...updateJobDto });
      if (job) {
        await this.jobRepository.save(job);
        return { job };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
