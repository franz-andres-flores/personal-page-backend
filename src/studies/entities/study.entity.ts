import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums";

@Entity({ name: 'studies' })
export class Study {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Universidad Nacional de Loja' })
    institution: string;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Ingeniería en Sistemas' })
    degree: string;

    @Column({ type: 'int' })
    @ApiProperty({ example: 2025 })
    startYear: number;

    @Column({ type: 'int', nullable: true })
    @ApiPropertyOptional({ example: 2026 })
    endYear: number;

    @Column({ type: 'boolean', default: false })
    @ApiPropertyOptional({ example: true, default: true })
    isCurrentStudy: boolean;

    @Column({ type: 'text', nullable: true })
    @ApiPropertyOptional({ example: 'Descripción de la carrera o estudio realizado' })
    description: string;

    @Column({ type: 'varchar', length: DBLength.path, nullable: true })
    @ApiPropertyOptional({ example: '/assets/studies' })
    certificate_path: string;

    @Column({ type: 'varchar', length: DBLength.name, nullable: true })
    @ApiPropertyOptional({ example: 'degree.pdf' })
    certicate_name: string;

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
