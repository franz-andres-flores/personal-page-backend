import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { CreateProjectDto } from './create-project.dto';
import { toBoolean } from 'src/common/utilities';
import { ProjectImage } from '../interfaces';


export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @ApiPropertyOptional({ example: true, default: true })
    isActive?: boolean;

    @IsOptional()
    @ApiPropertyOptional({ example: '[{ image: "project1.jpg", imagePublicId: "code-cloudinary" }]' })
    deleteImages?: ProjectImage[];
}
