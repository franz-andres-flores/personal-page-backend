import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RefreshTokenDto, SignInDto, ValidateTokenDto } from './dto/auth.dto';
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

  @Post('/validate-token')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Validar token',
    type: Boolean
  })
  validateToken(@Body() validateTokenDto: ValidateTokenDto) {
      return this.authService.validateToken(validateTokenDto);
  }

  @Post('/refresh-token')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Refrescar token',
    type: ResponseSignInDto
  })
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.authService.refreshToken(refreshTokenDto);
  }
}
