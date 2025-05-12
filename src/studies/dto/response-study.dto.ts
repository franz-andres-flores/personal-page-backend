import { ApiProperty } from "@nestjs/swagger";

import { SearchResponseDto } from "src/common/dtos";
import { Study } from "../entities/study.entity";

export class ResponseStudyDto {
    @ApiProperty({ type: () => Study })
    study: Study;
}

export class ResponseListStudyDto {
    @ApiProperty({ type: () => Study, isArray: true })
    studies: Study[];
}

export class ResponseSearchStudyDto extends SearchResponseDto {
    @ApiProperty({ type: () => Study })
    studies: Study[];
}
