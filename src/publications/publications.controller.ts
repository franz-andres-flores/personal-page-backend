import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ResponseListPublicationDto, ResponsePublicationDto, ResponseSearchPublicationDto } from './dto/response-publication.dto';
import { SearchDto } from 'src/common/dtos';
import { SearchPublicationDto } from './dto/get-publication.dto';

@ApiBearerAuth()
@ApiTags("Publicaciones")
@UseGuards(JwtAuthGuard)
@Controller('/publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear publicación',
    type: ResponsePublicationDto
  })
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.create(createPublicationDto);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de publicación',
    type: ResponseSearchPublicationDto
  })
  findAll(@Query() params: SearchPublicationDto) {
    return this.publicationsService.search(params);
  }

  @Get('/all-export')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtener registros de publicación para exportación',
    type: ResponseListPublicationDto
  })
  findAllExport() {
    return this.publicationsService.findAllExport();
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar publicación',
    type: ResponsePublicationDto
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(id, updatePublicationDto);
  }
}
