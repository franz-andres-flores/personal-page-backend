import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { requiredMessage } from "src/common/constants";

export class SignInDto {
    @IsNotEmpty({ message: requiredMessage('correo electrónico') })
    @ApiProperty({ example: 'andresfloresgallardo@gmail.com' })
    email: string;

    @IsNotEmpty({ message: requiredMessage('contraseña') })
    @ApiProperty({ example: 'Franz123' })
    password: string;
}