import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { requiredMessage } from "src/common/constants";
import { SearchDto } from "src/common/dtos";

export class SearchPublicationDto extends SearchDto {
    @IsNotEmpty({ message: requiredMessage('id sección') })
    @ApiProperty({ example: 1 })
    section_id: number;
}