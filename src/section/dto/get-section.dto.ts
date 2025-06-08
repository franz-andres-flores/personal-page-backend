import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { requiredMessage } from "src/common/constants";
import { SearchDto } from "src/common/dtos";

export class SearchSectionDto extends SearchDto {
    @IsNotEmpty({ message: requiredMessage('id categoría') })
    @ApiProperty({ example: 1 })
    category_id: number;
}