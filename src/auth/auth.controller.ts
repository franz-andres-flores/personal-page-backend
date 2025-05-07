import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { ResponseSignInDto } from './dto/response-auth.dto';

@ApiTags('Autenticación')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/sign-in')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Inicio de sesión',
    type: ResponseSignInDto
  })
  signIn(signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  
}
