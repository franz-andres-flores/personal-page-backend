import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { encryptPassword } from 'src/common/utilities';
import { SearchDto } from 'src/common/dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const result = await this.findByEmail(createUserDto.email);
      if (result.user) {
        throw new BadRequestException('El usuario con correo enviado ya existe');
      }

      const user = this.userRepository.create(createUserDto);
      user.password = await encryptPassword(user.password);
      await this.userRepository.save(user);

      return { id: user.id };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(params: SearchDto) {
    try {
      const skip = (params.page - 1) * params.pageSize;

      const query = this.userRepository.createQueryBuilder('u')
        .select([
          'u.id', 'u.firstName', 'u.lastName', 'u.email', 'u.role', 'u.isActive'
        ]);

      if (params.searcher != '') {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(`(MATCH (u.firstName) AGAINST (:search IN BOOLEAN MODE))`, { search: params.searcher + '*' })
              .orWhere(`(MATCH (u.lastName) AGAINST (:search IN BOOLEAN MODE))`, { search: params.searcher + '*' })
              .orWhere(`(MATCH (u.email) AGAINST (:search IN BOOLEAN MODE))`, { search: params.searcher + '*' });
          })
        );
      }

      if (params.active && !params.inactive) {
        query.andWhere(`(u.isActive = :opt1)`, { opt1: true });
      }

      if (!params.active && params.inactive) {
        query.andWhere(`(u.isActive = :opt2)`, { opt2: false });
      }

      if (params.inactive && params.active) {
        query.andWhere(`(u.isActive = :opt3 OR u.isActive = :opt4)`, { opt3: true, opt4: false });
      }

      const desc = (params.descending) ? 'DESC' : 'ASC';
      query.orderBy(`u.${params.sort_by}`, desc);

      const [users, total] = await Promise.all([
        query.skip(skip).take(params.pageSize).getMany(),
        query.getCount()
      ]);

      return { users, total };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return { user };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(user_id: number) {
    try {
      const user = await this.userRepository.findOne({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isActive: true
        },
        where: { id: user_id }
      });

      return { user };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllExport() {
    try {
      const users = await this.userRepository.find({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isActive: true
        }
      });

      return { users };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.preload({ id: id, ...updateUserDto });
      if (updateUserDto.password) {
        user.password = await encryptPassword(updateUserDto.password);
      }

      if (user) {
        await this.userRepository.save(user);
        return { id: user.id };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
