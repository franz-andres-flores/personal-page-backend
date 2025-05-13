import { ApiProperty } from "@nestjs/swagger";

import { SearchResponseDto } from "src/common/dtos";
import { Project } from "../entities/project.entity";


export class ResponseProjectDto {
    @ApiProperty({ type: () => Project })
    project: Project;
}

export class ResponseListProjectDto {
    @ApiProperty({ type: () => Project, isArray: true })
    projects: Project[];
}

export class ResponseSearchProjectDto extends SearchResponseDto {
    @ApiProperty({ type: () => Project })
    projects: Project[];
}
