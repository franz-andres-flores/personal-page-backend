import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { CreateCategoryDto } from './create-category.dto';
import { toBoolean } from 'src/common/utilities';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @ApiPropertyOptional({ example: true, default: true })
    isActive?: boolean;
}
