import { Controller, Get, Post, Body, Patch, Param, HttpStatus, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SearchDto } from 'src/common/dtos';
import { ResponseJobDto, ResponseListJobDto, ResponseSearchJobDto } from './dto/response-job.dto';
import { JwtAuthGuard } from 'src/auth/guards';

@ApiBearerAuth()
@ApiTags("Empleo")
@UseGuards(JwtAuthGuard)
@Controller('/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear empleo',
    type: ResponseJobDto
  })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de empleo',
    type: ResponseSearchJobDto
  })
  search(@Query() params: SearchDto) {
    return this.jobsService.search(params);
  }

  @Get('/all-export')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtener registros de empleo para exportación',
    type: ResponseListJobDto
  })
  findAllExport() {
    return this.jobsService.findAllExport();
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar empleo',
    type: ResponseJobDto
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }
}
