import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';
import { SearchDto } from 'src/common/dtos';
import { SearchPublicationDto } from './dto/get-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
  ) { }

  async create(createPublicationDto: CreatePublicationDto) {
    try {
      const job = this.publicationRepository.create(createPublicationDto);
      await this.publicationRepository.save(job);

      return { job };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(params: SearchPublicationDto) {
    try {
      const skip = (params.page - 1) * params.pageSize;

      const query = this.publicationRepository.createQueryBuilder('p')
        .select([
          'p.id', 'p.name', 'p.date', 'p.description', 'p.isActive'
        ])
        .where('(p.section_id = :section)', { section: params.section_id });

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

      const [publications, total] = await Promise.all([
        query.skip(skip).take(params.pageSize).getMany(),
        query.getCount()
      ]);

      return { publications, total };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllExport() {
    try {
      const query = this.publicationRepository.createQueryBuilder('p')
        .select([
          'p.id', 'p.name', 'p.date', 'p.description', 'p.isActive'
        ]);

      const publications = await query.getMany();

      return { publications };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    try {
      const publication = await this.publicationRepository.preload({ id: id, ...updatePublicationDto });
      if (publication) {
        await this.publicationRepository.save(publication);
        return { publication };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
