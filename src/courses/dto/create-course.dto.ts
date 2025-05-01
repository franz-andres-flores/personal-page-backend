import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "src/common/constants";

export class CreateCourseDto {
    @IsNotEmpty({ message: requiredMessage('nombre') })
    @ApiProperty({ example: 'Curso de Nest JS' })
    title: string;

    @IsNotEmpty({ message: requiredMessage('institución') })
    @ApiProperty({ example: 'Universidad Nacional de Loja' })
    school: string;

    @IsNotEmpty({ message: requiredMessage('Fecha de culminación') })
    @ApiProperty({ example: '2025-04-01' })
    date: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Descripción del curso realizado' })
    description: string;
}
