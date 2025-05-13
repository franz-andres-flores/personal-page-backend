import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpStatus, UseInterceptors, UploadedFile, Query, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ResponseCategoryDto, ResponseListCategoryDto, ResponseSearchCategoryDto } from './dto/response-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchDto } from 'src/common/dtos';

@ApiBearerAuth()
@ApiTags("Categorías")
@UseGuards(JwtAuthGuard)
@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear categoría',
    type: ResponseCategoryDto
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() file?: Express.Multer.File) {
    return this.categoriesService.create(createCategoryDto, file);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de categoría',
    type: ResponseSearchCategoryDto
  })
  search(@Query() params: SearchDto) {
    return this.categoriesService.search(params);
  }

  @Get('/all-export')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtener registros de categorías para exportación',
    type: ResponseListCategoryDto
  })
  findAllExport() {
    return this.categoriesService.findAllExport();
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar categoría',
    type: ResponseCategoryDto
  })
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.categoriesService.update(id, updateCategoryDto, file);
  }
}
