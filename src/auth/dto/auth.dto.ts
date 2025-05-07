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

export class ValidateTokenDto {
    @IsNotEmpty({ message: requiredMessage('token') })
    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVTJGc2RHVmtYMTlDMnlWU1RocXVYN05mNzhqa3Y2YzZDSlhFT0p3WnpKSWdpSGh3UGVISUFpYUlndnR1QWxvcnp1dFdYQzhSVGtVMmRqNGVmVEZadUM4T3FOYTE1U3JMVEdDV0o1QWpQT0hBUDJKL1ZIcTNMUzNGdWx0OEhZc21PVzFKMjBqRzBjWDFHVDdjNVdIMTgyVkFCSW5JSy83RW9zalBIV1h4ZzN2enZ2NVlUa3A1Z3NOYTFGdEpWMHRnSVhpRXNUSmwxRjJhakN6ck5UYTJLTjEwbjVsdlcwbGhhMWVRdTZHNDJHNU5MR25obFNnazZnV2FNaHBYajI2NEErU0VlejZzOGZUN2NWK0x3U3VLSmJxeVRFckFjU052aksxbzMxbG9RenM9IiwiaWF0IjoxNzQzMjAwMzE0LCJleHAiOjE3NDMyMTAzMTR9" })
    token: string;
}

export class RefreshTokenDto {
    @IsNotEmpty({ message: requiredMessage('id Usuario') })
    @ApiProperty({ example: 1 })
    idUser: number;
}

export class UpdatePasswordDto {
    @IsNotEmpty({ message: requiredMessage('antigua contraseña') })
    @ApiProperty({ example: 'Franz123' })
    oldPassword: string;

    @IsNotEmpty({ message: requiredMessage('nueva contraseña') })
    @ApiProperty({ example: 'Franz1234' })
    newPassword: string;

    @IsNotEmpty({ message: requiredMessage('id Usuario') })
    @ApiProperty({ example: 1 })
    idUser: number;
}
