import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

import { requiredMessage } from "src/common/constants";
import { UserRole } from "src/common/enums";

export class CreateUserDto {
    @IsNotEmpty({ message: requiredMessage('nombre') })
    @ApiProperty({ example: 'Franz Andrés' })
    firstName: string;

    @IsNotEmpty({ message: requiredMessage('apellido') })
    @ApiProperty({ example: 'Flores Gallardo' })
    lastName: string;

    @IsNotEmpty({ message: requiredMessage('email') })
    @IsEmail()
    @ApiProperty({ example: 'andresfloresgallardo@gmail.com' })
    email: string;

    @IsNotEmpty({ message: requiredMessage('contraseña') })
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
    })
    @ApiProperty({ example: 'Franz123' })
    password: string;

    @IsNotEmpty({ message: requiredMessage('rol') })
    @ApiProperty({ example: UserRole.ADMIN })
    role: UserRole;
}
