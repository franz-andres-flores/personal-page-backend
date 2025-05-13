import { ApiProperty } from "@nestjs/swagger";

import { SearchResponseDto } from "src/common/dtos";
import { Section } from "../entities/section.entity";

export class ResponseSectionDto {
    @ApiProperty({ type: () => Section })
    section: Section;
}

export class ResponseListSectionDto {
    @ApiProperty({ type: () => Section, isArray: true })
    sections: Section[];
}

export class ResponseSearchSectionDto extends SearchResponseDto {
    @ApiProperty({ type: () => Section })
    sections: Section[];
}