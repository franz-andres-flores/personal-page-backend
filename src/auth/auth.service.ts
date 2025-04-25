import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/auth.dto';
import { comparePasswords } from 'src/common/utilities';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(signInDto: SignInDto) {
        try {
            const user = await this.userService.findByEmail(signInDto.email);
            if (!user.user) {
                throw new UnauthorizedException('El usuario no existe en el sistema');
            }

            if (!user.user.isActive) {
                throw new UnauthorizedException('El usuario esta inactivo. Por favor contácte al administrador');
            }

            const isPasswordCorrect = await comparePasswords(signInDto.password, user.user.password);
            if (!isPasswordCorrect) {
                throw new UnauthorizedException('El usuario o contraseña es incorrecta');
            }

            const payload = {
                id: user.user.id,
                firstName: user.user.firstName,
                lastName: user.user.lastName,
                email: user.user.email
            }

            return {
                ...payload,
                access_token: this.jwtService.sign(payload),
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
