import { Controller, Get, Post, Body, Patch, Param, HttpStatus, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchDto } from 'src/common/dtos';
import { ResponseSearchUserDto, ResponseUserDto } from './dto/response-user.dto';
import { JwtAuthGuard } from 'src/auth/guards';

@ApiBearerAuth()
@ApiTags('Usuarios')
@UseGuards(JwtAuthGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crear usuario',
    type: ResponseUserDto
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/search')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de usuario',
    type: ResponseSearchUserDto
  })
  search(@Query() searchDto: SearchDto) {
    return this.userService.search(searchDto);
  }

  @Get('/all-export')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Buscar y paginar registros de usuario',
    type: ResponseSearchUserDto
  })
  findAllExport() {
    return this.userService.findAllExport();
  }

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtener registro de usuario',
    type: ResponseUserDto
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualizar usuario',
    type: ResponseUserDto
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
