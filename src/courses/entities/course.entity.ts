import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums";

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Universidad Nacional de Loja' })
    institution: string;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Curso de Nest JS' })
    title: string;

    @Column({ type: 'date' })
    @ApiProperty({ example: '2025-04-01' })
    date: string;

    @Column({ type: 'text', nullable: true })
    @ApiPropertyOptional({ example: 'Descripción del curso realizado' })
    description: string;

    @Column({ type: 'varchar', length: DBLength.path, nullable: true })
    @ApiPropertyOptional({ example: '/assets/courses' })
    certificatePath: string;

    @Column({ type: 'varchar', length: DBLength.name, nullable: true })
    @ApiPropertyOptional({ example: 'nest.pdf' })
    certicateName: string;

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
