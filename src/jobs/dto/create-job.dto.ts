import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "src/common/constants";

export class CreateJobDto {
    @IsNotEmpty({ message: requiredMessage('empresa') })
    @ApiProperty({ example: 'Clipp' })
    company: string;

    @IsNotEmpty({ message: requiredMessage('posición') })
    @ApiProperty({ example: 'Desarrollador' })
    position: string;

    @IsNotEmpty({ message: requiredMessage('mes inicio') })
    @ApiProperty({ example: 'Junio' })
    start_month: string;

    @IsNotEmpty({ message: requiredMessage('año inicio') })
    @ApiProperty({ example: '2025' })
    start_year: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Noviembre' })
    end_month: string;

    @IsOptional()
    @ApiProperty({ example: '2026' })
    end_year: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Descripción del trabajo' })
    description: string;    
}
