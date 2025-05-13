import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

import { requiredMessage } from "src/common/constants";
import { Section } from "src/section/entities/section.entity";

export class CreatePublicationDto {
    @IsNotEmpty({ message: requiredMessage('nombre') })
    @ApiProperty({ example: 'Event Loop en Node JS' })
    name: string;

    @IsNotEmpty({ message: requiredMessage('fecha') })
    @ApiProperty({ example: '2025-04-01' })
    date: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Descripción de la sección realizada' })
    description: string;

    @IsNotEmpty({ message: requiredMessage('sección') })
    @ApiProperty({ type: () => Section })
    section: Section;
}
