import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateStudyDto } from './create-study.dto';

export class UpdateStudyDto extends PartialType(CreateStudyDto) {
    @IsOptional()
    @ApiPropertyOptional({ example: true, default: true })
    isActive: boolean;
}
