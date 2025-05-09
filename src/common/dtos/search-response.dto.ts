import { ApiProperty } from "@nestjs/swagger";

export class SearchResponseDto {
    @ApiProperty({ example: 1 })
    total: number;
}
