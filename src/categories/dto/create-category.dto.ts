import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "src/common/constants";

export class CreateCategoryDto {
    @IsNotEmpty({ message: requiredMessage('nombre') })
    @ApiProperty({ example: 'Node Js' })
    name: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Descripción del curso realizado' })
    description: string;
}
