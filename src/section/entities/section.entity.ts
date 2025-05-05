import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums";
import { Category } from "src/categories/entities/category.entity";

@Entity({ name: 'sections' })
export class Section {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ type: 'varchar', length: DBLength.name })
    @ApiProperty({ example: 'Event Loop en Node JS' })
    name: string;

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

    @ManyToOne(() => Category, category => category.sections)
    @JoinColumn({ name: "category_id" })
    category: Category;
}
