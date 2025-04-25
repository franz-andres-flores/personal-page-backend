import { ApiProperty } from "@nestjs/swagger";

export class ResponseSignInDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Franz Andrés' })
    firstName: string;

    @ApiProperty({ example: 'Flores Gallardo' })
    lastName: string;

    @ApiProperty({ example: 'andresfloresgallardo@gmail.com' })
    email: string;
}