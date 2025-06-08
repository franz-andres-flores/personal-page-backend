import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ResponseListSectionDto, ResponseSearchSectionDto, ResponseSectionDto } from './dto/response-section.dto';
import { SearchDto } from 'src/common/dtos';
import { SearchSectionDto } from './dto/get-section.dto';

@ApiBearerAuth()
@ApiTags("Secciones")
@UseGuards(JwtAuthGuard)
@Controller('/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear sección',
    type: ResponseSectionDto
  })
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de secciones',
    type: ResponseSearchSectionDto
  })
  search(@Query() params: SearchSectionDto) {
    return this.sectionService.search(params);
  }

  @Get('/all-export')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtener registros de secciones para exportación',
    type: ResponseListSectionDto
  })
  findAllExport() {
    return this.sectionService.findAllExport();
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar sección',
    type: ResponseSectionDto
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(id, updateSectionDto);
  }
}
