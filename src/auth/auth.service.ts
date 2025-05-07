import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { RefreshTokenDto, SignInDto, ValidateTokenDto } from './dto/auth.dto';
import { comparePasswords } from 'src/common/utilities';
import { JwtPayload } from './interfaces/payload.interface';

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

            const payload: JwtPayload = {
                id: user.user.id,
                firstName: user.user.firstName,
                lastName: user.user.lastName,
                email: user.user.email,
                role: user.user.role
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

    async validateToken(validateTokenDto: ValidateTokenDto) {
        try {
            const validateToken = this.jwtService.verify(validateTokenDto.token);
            return { status: (validateToken) ? true : false };
        } catch (error) {
            return false;
        }
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        try {
            const user = await this.userService.findOne(refreshTokenDto.idUser);
            const payload: JwtPayload = {
                id: user.user.id,
                firstName: user.user.firstName,
                lastName: user.user.lastName,
                email: user.user.email,
                role: user.user.role
            }

            const token = this.jwtService.sign(payload);

            return {
                user: payload,
                token: token
            }
        } catch (error) {
            console.log(error);
        }
    }
}
