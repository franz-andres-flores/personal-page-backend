import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums";
import { JobTechnology } from "../interfaces/job-technology.interface";

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

    @Column({ type: 'int' })
    @ApiProperty({ example: 2 })
    start_month: number;

    @Column({ type: 'int' })
    @ApiProperty({ example: 2025 })
    start_year: number;
  
    @Column({ type: 'int', nullable: true })
    @ApiPropertyOptional({ example: 10 })
    end_month: number;

    @Column({ type: 'int', nullable: true })
    @ApiPropertyOptional({ example: 2026 })
    end_year: number;

    @Column({ type: 'text', nullable: true })
    @ApiPropertyOptional({ example: 'Descripción del trabajo' })
    description: string;

    @Column({type: 'json', nullable: true})
    @ApiPropertyOptional({ example: '[{ name: "Nest JS" }]' })
    technologies: JobTechnology;

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
