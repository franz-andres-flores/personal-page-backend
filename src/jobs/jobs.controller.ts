import { Controller, Get, Post, Body, Patch, Param, HttpStatus, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { SearchDto } from 'src/common/dtos';

@ApiBearerAuth()
@ApiTags("Trabajos")
@UseGuards(AuthGuard('jwt'))
@Controller('/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear trabajo',
    type: Job
  })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Búsqueda y pasginación de trabajos',
    type: Job,
    isArray: true
  })
  search(@Query() params: SearchDto) {
    return this.jobsService.search(params);
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar trabajo',
    type: Job
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }
}
