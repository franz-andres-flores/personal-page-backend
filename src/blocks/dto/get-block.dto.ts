import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { requiredMessage } from "src/common/constants";
import { SearchDto } from "src/common/dtos";

export class SearchBlockDto extends SearchDto {
    @IsNotEmpty({ message: requiredMessage('id publicación') })
    @ApiProperty({ example: 1 })
    publication_id: number;
}

export class ExportBlockDto {
    @IsNotEmpty({ message: requiredMessage('id publicación') })
    @ApiProperty({ example: 1 })
    publication_id: number;
}