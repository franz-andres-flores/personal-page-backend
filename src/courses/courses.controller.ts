import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { SearchDto } from 'src/common/dtos';
import { JwtAuthGuard } from 'src/auth/guards';
import { ResponseCourseDto, ResponseListCourseDto, ResponseSearchCourseDto } from './dto/response-course.dto';

@ApiBearerAuth()
@ApiTags("Cursos")
@UseGuards(JwtAuthGuard)
@Controller('/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear curso',
    type: ResponseCourseDto
  })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de cursos',
    type: ResponseSearchCourseDto
  })
  search(@Query() params: SearchDto) {
    return this.coursesService.search(params);
  }

  @Get('/all-export')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtener registros de cursos para exportación',
    type: ResponseListCourseDto
  })
  findAllExport() {
    return this.coursesService.findAllExport();
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar curso',
    type: ResponseCourseDto
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }
}
