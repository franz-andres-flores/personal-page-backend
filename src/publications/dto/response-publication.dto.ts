import { ApiProperty } from "@nestjs/swagger";

import { SearchResponseDto } from "src/common/dtos";
import { Publication } from "../entities/publication.entity";


export class ResponsePublicationDto {
    @ApiProperty({ type: () => Publication })
    publication: Publication;
}

export class ResponseListPublicationDto {
    @ApiProperty({ type: () => Publication, isArray: true })
    publications: Publication[];
}

export class ResponseSearchPublicationDto extends SearchResponseDto {
    @ApiProperty({ type: () => Publication })
    publications: Publication[];
}
