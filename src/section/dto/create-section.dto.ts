import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { Category } from "src/categories/entities/category.entity";
import { requiredMessage } from "src/common/constants";

export class CreateSectionDto {
    @IsNotEmpty({ message: requiredMessage('nombre') })
    @ApiProperty({ example: 'Event Loop en Node JS' })
    name: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Descripción de la sección realizada' })
    description: string;

    @IsNotEmpty({ message: requiredMessage('categoría') })
    @ApiProperty({ type: () => Category })
    category: Category;
}
