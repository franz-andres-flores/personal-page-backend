import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user.dto';
import { toBoolean } from 'src/common/utilities';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @Transform(({ value }) => toBoolean(value))
    @ApiPropertyOptional({ example: true })
    isActive: boolean;
}
