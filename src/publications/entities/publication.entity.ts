import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums";
import { Section } from "src/section/entities/section.entity";

@Entity({ name: 'publications' })
export class Publication {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Event Loop en Node JS' })
    name: string;

    @Column({ type: 'datetime' })
    @ApiProperty({ example: '2025-04-01' })
    date: Date | string;

    @Column({ type: 'varchar', length: DBLength.description, nullable: true })
    @ApiPropertyOptional({ example: 'Descripción de la sección realizada' })
    description: string;

    @Column({ type: 'boolean', default: true })
    @ApiPropertyOptional({ example: true, default: true })
    isActive: boolean;

    @CreateDateColumn({ comment: 'Fecha y hora de creación' })
    @ApiPropertyOptional({ example: '2024-10-10 12:00:00' })
    created_at: Date | string;

    @UpdateDateColumn({ comment: 'Fecha y hora de modificación' })
    @ApiPropertyOptional({ example: '2024-10-10 12:30:00' })
    updated_at: Date | string;

    @ManyToOne(() => Section, section => section.publications)
    @JoinColumn({ name: 'section_id' })
    section: Section;
}
