import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { CreateJobDto } from './create-job.dto';
import { toBoolean } from 'src/common/utilities';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @ApiPropertyOptional({ example: true, default: true })
    isActive: boolean;
}
