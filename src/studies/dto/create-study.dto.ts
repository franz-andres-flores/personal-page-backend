import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "src/common/constants";

export class CreateStudyDto {
    @IsNotEmpty({ message: requiredMessage('institución') })
    @ApiProperty({ example: 'Universidad Nacional de Loja' })
    school: string;

    @IsNotEmpty({ message: requiredMessage('carrera') })
    @ApiProperty({ example: 'Ingeniería en Sistemas' })
    carrer: string;

    @IsNotEmpty({ message: requiredMessage('año de inicio') })
    @ApiProperty({ example: '2025' })
    start_year: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '2026' })
    end_year: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Descripción de la carrera o estudio realizado' })
    description: string;
}
