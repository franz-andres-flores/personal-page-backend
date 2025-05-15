import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { CreateBlockDto } from './create-block.dto';
import { toBoolean } from 'src/common/utilities';


export class UpdateBlockDto extends PartialType(CreateBlockDto) {
    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @ApiPropertyOptional({ example: true, default: true })
    isActive: boolean;
}
