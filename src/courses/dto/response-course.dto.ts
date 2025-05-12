import { ApiProperty } from "@nestjs/swagger";

import { SearchResponseDto } from "src/common/dtos";
import { Course } from "../entities/course.entity";

export class ResponseCourseDto {
    @ApiProperty({ type: () => Course })
    course: Course;
}

export class ResponseListCourseDto {
    @ApiProperty({ type: () => Course, isArray: true })
    courses: Course[];
}

export class ResponseSearchCourseDto extends SearchResponseDto {
    @ApiProperty({ type: () => Course })
    courses: Course[];
}