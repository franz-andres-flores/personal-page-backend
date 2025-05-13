import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums";
import { ProjectImage, ProjectTechnology } from "../interfaces";

@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Proyecto de página personal' })
    name: string;

    @Column({ type: 'text' })
    @ApiPropertyOptional({ example: 'Descripción del proyecto realizado' })
    description: string;

    @Column({ type: 'json', nullable: true })
    @ApiPropertyOptional({ example: '[{ name: "Nest JS" }]' })
    technologies: ProjectTechnology;

    @Column({ type: 'varchar', length: DBLength.path })
    @ApiPropertyOptional({ example: 'https://github.com' })
    urlRepository: string;

    @Column({ type: 'json', nullable: true })
    @ApiPropertyOptional({ example: '[{ image: "project1.jpg", imagePublicId: "code-cloudinary" }]' })
    images:  ProjectImage[];

    @Column({ type: 'boolean', default: true })
    @ApiPropertyOptional({ example: true, default: true })
    isActive: boolean;

    @CreateDateColumn({ comment: 'Fecha y hora de creación' })
    @ApiPropertyOptional({ example: '2024-10-10 12:00:00' })
    created_at: Date | string;

    @UpdateDateColumn({ comment: 'Fecha y hora de modificación' })
    @ApiPropertyOptional({ example: '2024-10-10 12:30:00' })
    updated_at: Date | string;
}

