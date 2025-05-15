import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "src/common/constants";
import { BlockProvider, BlockType } from "src/common/enums";
import { BlockDetails } from "../interfaces/block-detail.interface";

export class CreateBlockDto {
    @IsNotEmpty({ message: requiredMessage('orden') })
    @ApiProperty({ example: 1 })
    order: number;

    @IsNotEmpty({ message: requiredMessage('tipo') })
    @ApiProperty({ example: BlockType.TEXT })
    type: BlockType;

    @IsOptional()
    @ApiPropertyOptional({ example: BlockProvider.CLOUDINARY })
    provider: BlockProvider;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Imagen principal' })
    identifier: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Contenido de texto' })
    content: string;

    @IsOptional()
    @ApiPropertyOptional({ example: "{ align:1, width:100, height:100 }" })
    details: BlockDetails;
}
