import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StudiesService } from './studies.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { SearchDto } from 'src/common/dtos';
import { JwtAuthGuard } from 'src/auth/guards';
import { ResponseListStudyDto, ResponseSearchStudyDto, ResponseStudyDto } from './dto/response-study.dto';


@ApiBearerAuth()
@ApiTags("Estudios")
@UseGuards(JwtAuthGuard)
@Controller('/studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear estudio',
    type: ResponseStudyDto
  })
  create(@Body() createStudyDto: CreateStudyDto) {
    return this.studiesService.create(createStudyDto);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de estudio',
    type: ResponseSearchStudyDto
  })
  search(@Query() params: SearchDto) {
    return this.studiesService.search(params);
  }

  @Get('/all-export')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtener registros de estudio para exportación',
    type: ResponseListStudyDto
  })
  findAllExport() {
    return this.studiesService.findAllExport();
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar estudio',
    type: ResponseStudyDto
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStudyDto: UpdateStudyDto) {
    return this.studiesService.update(id, updateStudyDto);
  }
}
