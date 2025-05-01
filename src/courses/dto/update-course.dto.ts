import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsOptional()
    @ApiPropertyOptional({ example: true, default: true })
    isActive: boolean;
}
