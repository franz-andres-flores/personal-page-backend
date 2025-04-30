import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "../constants";

export class SearchDto {
    @IsNotEmpty({ message: requiredMessage('página') })
    @ApiProperty({ example: 1 })
    page: number;

    @IsNotEmpty({ message: requiredMessage('tamaño de consulta') })
    @ApiProperty({ example: 10 })
    pageSize: number;

    @IsOptional()
    @ApiPropertyOptional({ example: '' })
    searcher?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'true' })
    active: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'true' })
    inactive: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'id' })
    sort_by?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'true' })
    descending?: string;
}
