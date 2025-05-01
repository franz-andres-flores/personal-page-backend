import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { SearchDto } from 'src/common/dtos';

@ApiBearerAuth()
@ApiTags("Cursos")
@UseGuards(AuthGuard('jwt'))
@Controller('/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear curso',
    type: Course
  })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Búsqueda y pasginación de cursos',
    type: Course,
    isArray: true
  })
  search(@Query() params: SearchDto) {
    return this.coursesService.search(params);
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Crear curso',
    type: Course
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }
}
