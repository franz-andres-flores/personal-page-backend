import { ApiProperty } from "@nestjs/swagger";

import { SearchResponseDto } from "src/common/dtos";
import { Block } from "../entities/block.entity";

export class ResponseBlockDto {
    @ApiProperty({ type: () => Block })
    block: Block;
}

export class ResponseListBlockDto {
    @ApiProperty({ type: () => Block, isArray: true })
    blocks: Block[];
}

export class ResponseSearchBlockDto extends SearchResponseDto {
    @ApiProperty({ type: () => Block })
    blocks: Block[];
}
