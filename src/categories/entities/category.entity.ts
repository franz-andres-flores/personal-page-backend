import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums";
import { Section } from "src/section/entities/section.entity";

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Node Js' })
    name: string;

    @Column({ type: 'varchar', length: DBLength.path, nullable: true })
    @ApiPropertyOptional({ name: 'node.jpg' })
    image: string;

    @Column({ type: 'varchar', length: DBLength.path, nullable: true })
    @ApiPropertyOptional({ name: 'code-cloudinary' })
    imagePublicId: string;

    @Column({ type: 'text', nullable: true })
    @ApiPropertyOptional({ example: 'Descripción del curso realizado' })
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

    @OneToMany(() => Section, section => section.category)
    sections: Section[];
}
