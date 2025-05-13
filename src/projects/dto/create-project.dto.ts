import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "src/common/constants";
import { ProjectTechnology } from "../interfaces";

export class CreateProjectDto {
    @IsNotEmpty({ message: requiredMessage('nombre') })
    @ApiProperty({ example: 'Proyecto de página personal' })
    name: string;

    @IsNotEmpty({ message: requiredMessage('descripción del proyecto') })
    @ApiPropertyOptional({ example: 'Descripción del proyecto realizado' })
    description: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '[{ name: "Nest JS" }]' })
    technologies: ProjectTechnology;

    @IsOptional()
    @ApiPropertyOptional({ example: 'https://github.com' })
    urlRepository: string;
}
