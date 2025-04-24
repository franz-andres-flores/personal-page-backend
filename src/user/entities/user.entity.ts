import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums/db-lengths";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Franz Andrés' })
    firstName: string;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Flores Gallardo' })
    lastName: string;

    @Column({ type: 'varchar', length: DBLength.email })
    @ApiProperty({ example: 'andresfloresgallardo@gmail.com' })
    email: string;

    @Column({ type: 'varchar', length: DBLength.password })
    @ApiProperty({ example: 'Franz123' })
    password: string;

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
