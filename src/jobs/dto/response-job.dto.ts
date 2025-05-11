import { ApiProperty } from "@nestjs/swagger";

import { SearchResponseDto } from "src/common/dtos";
import { Job } from "../entities/job.entity";

export class ResponseJobDto {
    @ApiProperty({ type: () => Job })
    job: Job;
}

export class ResponseListJobDto {
    @ApiProperty({ type: () => Job, isArray: true })
    jobs: Job[];
}

export class ResponseSearchJobDto extends SearchResponseDto {
    @ApiProperty({ type: () => Job })
    jobs: Job[];
}
