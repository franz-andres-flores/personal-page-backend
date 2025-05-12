import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

import { requiredMessage } from "src/common/constants";
import { JobTechnology } from "../interfaces/job-technology.interface";

export class CreateJobDto {
    @IsNotEmpty({ message: requiredMessage('empresa') })
    @ApiProperty({ example: 'Clipp' })
    company: string;

    @IsNotEmpty({ message: requiredMessage('posición') })
    @ApiProperty({ example: 'Desarrollador' })
    position: string;

    @IsOptional()
    @ApiPropertyOptional({ example: true, default: true })
    isCurrentJob: boolean;

    @IsNotEmpty({ message: requiredMessage('mes inicio') })
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ example: 2 })
    startMonth: number;

    @IsNotEmpty({ message: requiredMessage('año inicio') })
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ example: 2025 })
    startYear: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiPropertyOptional({ example: 'Noviembre' })
    endMonth: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ example: '2026' })
    endYear: number;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Descripción del trabajo' })
    description: string;
    
    @IsOptional()
    @ApiPropertyOptional({ example: '[{ name: "Nest JS" }]' })
    technologies: JobTechnology;
}
