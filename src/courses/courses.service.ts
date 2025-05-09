import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { SearchDto } from 'src/common/dtos';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    try {
      const study = this.courseRepository.create(createCourseDto);
      await this.courseRepository.save(study);

      return { study };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(params: SearchDto) {
    try {
      const skip = (params.page - 1) * params.pageSize;

      const query = this.courseRepository.createQueryBuilder('c')
        .select([
          'c.id', 'c.title', 'c.school', 'c.date', 'c.description', 'c.isActive'
        ]);

      if (params.searcher != '') {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(`(LOWER(c.title) LIKE LOWER(:search))`, { search: `%${params.searcher}%` })
              .orWhere(`(LOWER(c.title) LIKE LOWER(:search))`, { search: `%${params.searcher}%` });
          })
        );
      }

      // if (params.active == 'true' && params.inactive == 'false') {
      //   query.andWhere(`(c.isActive = :val)`, { val: true });
      // }

      // if (params.inactive == 'true' && params.active == 'false') {
      //   query.andWhere(`(c.isActive = :val1)`, { val1: false });
      // }

      // if (params.inactive == 'true' && params.active == 'true') {
      //   query.andWhere(`(c.isActive = :active OR c.isActive = :inactive)`, { active: true, inactive: false });
      // }

      const desc = (params.descending) ? 'DESC' : 'ASC';
      const sort = `c.${params.sort_by}`;
      query.orderBy(sort, desc);

      const [courses, total] = await Promise.all([
        query.skip(skip).take(params.pageSize).getMany(),
        query.getCount()
      ]);

      return { courses, total };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.courseRepository.preload({ id: id, ...updateCourseDto });
      if (course) {
        await this.courseRepository.save(course);
        return { course };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
