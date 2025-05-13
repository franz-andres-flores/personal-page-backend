import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { CreatePublicationDto } from './create-publication.dto';
import { toBoolean } from 'src/common/utilities';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @ApiPropertyOptional({ example: true, default: true })
    isActive?: boolean;

}
