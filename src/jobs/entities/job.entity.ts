import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums";

@Entity({ name: 'jobs' })
export class Job {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Clipp' })
    company: string;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Desarrollador' })
    position: string;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Junio' })
    start_month: string;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: '2025' })
    start_year: string;
  
    @Column({ type: 'varchar', length: DBLength.name, nullable: true })
    @ApiPropertyOptional({ example: 'Noviembre' })
    end_month: string;

    @Column({ type: 'varchar', length: DBLength.name, nullable: true })
    @ApiPropertyOptional({ example: '2026' })
    end_year: string;

    @Column({ type: 'text', nullable: true })
    @ApiPropertyOptional({ example: 'Descripción del trabajo' })
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
