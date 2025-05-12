import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "src/common/constants";

export class CreateStudyDto {
    @IsNotEmpty({ message: requiredMessage('institución') })
    @ApiProperty({ example: 'Universidad Nacional de Loja' })
    institution: string;

    @IsNotEmpty({ message: requiredMessage('carrera') })
    @ApiProperty({ example: 'Ingeniería en Sistemas' })
    degree: string;

    @IsNotEmpty({ message: requiredMessage('año de inicio') })
    @ApiProperty({ example: 2025 })
    startYear: number;

    @IsOptional()
    @ApiPropertyOptional({ example: true, default: true })
    isCurrentStudy: boolean;

    @IsOptional()
    @ApiPropertyOptional({ example: 2026 })
    endYear: number;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Descripción de la carrera o estudio realizado' })
    description: string;
}
