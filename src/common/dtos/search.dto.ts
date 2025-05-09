import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "../constants";
import { Transform, Type } from "class-transformer";
import { toBoolean } from "../utilities";

export class SearchDto {
    @IsNotEmpty({ message: requiredMessage('página') })
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ example: 1 })
    page: number;

    @IsNotEmpty({ message: requiredMessage('tamaño de consulta') })
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ example: 10 })
    pageSize: number;

    @IsOptional()
    @ApiPropertyOptional({ example: '' })
    searcher?: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => toBoolean(value))
    @ApiPropertyOptional({ example: true })
    active: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => toBoolean(value))
    @ApiPropertyOptional({ example: true })
    inactive: boolean;

    @IsOptional()
    @ApiPropertyOptional({ example: 'id' })
    sort_by?: string;

    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @ApiPropertyOptional({ example: true })
    descending?: boolean;
}
