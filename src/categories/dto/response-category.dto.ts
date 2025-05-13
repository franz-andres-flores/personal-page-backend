import { ApiProperty } from "@nestjs/swagger";

import { SearchResponseDto } from "src/common/dtos";
import { Category } from "../entities/category.entity";

export class ResponseCategoryDto {
    @ApiProperty({ type: () => Category })
    category: Category;
}

export class ResponseListCategoryDto {
    @ApiProperty({ type: () => Category, isArray: true })
    categories: Category[];
}

export class ResponseSearchCategoryDto extends SearchResponseDto {
    @ApiProperty({ type: () => Category })
    categories: Category[];
}
