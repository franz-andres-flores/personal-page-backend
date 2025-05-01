import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StudiesService } from './studies.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { Study } from './entities/study.entity';
import { SearchDto } from 'src/common/dtos';


@ApiBearerAuth()
@ApiTags("Estudios")
@UseGuards(AuthGuard('jwt'))
@Controller('/studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear estudio',
    type: Study
  })
  create(@Body() createStudyDto: CreateStudyDto) {
    return this.studiesService.create(createStudyDto);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Búsqueda y pasginación de estudios',
    type: Study,
    isArray: true
  })
  search(@Query() params: SearchDto) {
    return this.studiesService.search(params);
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Crear estudio',
    type: Study
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStudyDto: UpdateStudyDto) {
    return this.studiesService.update(id, updateStudyDto);
  }
}
