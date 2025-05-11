import { ApiProperty } from "@nestjs/swagger";

import { SearchResponseDto } from "src/common/dtos";
import { User } from "../entities/user.entity";

export class ResponseUserDto {
    @ApiProperty({ type: () => User })
    user: User;
}

export class ResponseListUserDto {
    @ApiProperty({ type: () => User, isArray: true })
    users: User[];
}

export class ResponseSearchUserDto extends SearchResponseDto {
    @ApiProperty({ type: () => User })
    users: User[];
}
