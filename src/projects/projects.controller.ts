import { Controller, Get, Post, Body, Patch, Param, UseInterceptors, UploadedFiles, ParseIntPipe, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ResponseListProjectDto, ResponseProjectDto, ResponseSearchProjectDto } from './dto/response-project.dto';
import { SearchDto } from 'src/common/dtos';

@ApiBearerAuth()
@ApiTags("Proyectos")
@UseGuards(JwtAuthGuard)
@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear proyecto',
    type: ResponseProjectDto
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] }
  ) {
    return this.projectsService.create(createProjectDto, files.images || []);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de proyecto',
    type: ResponseSearchProjectDto
  })
  search(@Query() params: SearchDto) {
    return this.projectsService.search(params);
  }

  @Get('/all-export')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtener registros de proyectos para exportación',
    type: ResponseListProjectDto
  })
  findAllExport() {
    return this.projectsService.findAllExport();
  }


  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar proyecto',
    type: ResponseProjectDto
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] }
  ) {
    return this.projectsService.update(id, updateProjectDto, files.images);
  }
}
