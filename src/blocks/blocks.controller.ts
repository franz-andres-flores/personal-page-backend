import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpStatus, Query, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ResponseBlockDto, ResponseListBlockDto, ResponseSearchBlockDto } from './dto/response-block.dto';
import { ExportBlockDto, SearchBlockDto } from './dto/get-block.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags("Bloques de Publicación")
@UseGuards(JwtAuthGuard)
@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear bloque de publicación',
    type: ResponseBlockDto
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createBlockDto: CreateBlockDto, @UploadedFile() file?: Express.Multer.File) {
    return this.blocksService.create(createBlockDto, file);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de bloques de publicación',
    type: ResponseSearchBlockDto
  })
  findAll(@Query() params: SearchBlockDto) {
    return this.blocksService.search(params);
  }

  @Get('/all-export')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtener registros de bloques de publicación para exportación',
    type: ResponseListBlockDto
  })
  findAllExport(@Query() params: ExportBlockDto) {
    return this.blocksService.findAllExport(params);
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar bloque de  publicación',
    type: ResponseBlockDto
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlockDto: UpdateBlockDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.blocksService.update(id, updateBlockDto, file);
  }
}
