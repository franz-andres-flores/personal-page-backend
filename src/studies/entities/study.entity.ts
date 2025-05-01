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
    school: string;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Ingeniería en Sistemas' })
    carrer: string;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: '2025' })
    start_year: string;

    @Column({ type: 'varchar', length: DBLength.name, nullable: true })
    @ApiPropertyOptional({ example: '2026' })
    end_year: string;

    @Column({ type: 'text', nullable: true })
    @ApiPropertyOptional({ example: 'Descripción de la carrera o estudio realizado' })
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
}
