import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { DBLength } from "src/common/db/enums";
import { BlockProvider, BlockType } from "src/common/enums";
import { BlockDetails } from "../interfaces/block-detail.interface";
import { Publication } from "src/publications/entities/publication.entity";

@Entity({ name: 'blocks' })
export class Block {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ type: 'int' })
    @ApiProperty({ example: 1 })
    order: number;

    @Column({ type: 'enum', enum: BlockType })
    @ApiProperty({ example: BlockType.TEXT })
    type: BlockType;

    @Column({ type: 'enum', enum: BlockProvider, nullable: true })
    @ApiPropertyOptional({ example: BlockProvider.CLOUDINARY })
    provider: BlockProvider;

    @Column({ type: 'varchar', length: DBLength.name, nullable: true })
    @ApiPropertyOptional({ example: 'Imagen principal' })
    identifier: string;

    @Column({ type: 'text', nullable: true })
    @ApiPropertyOptional({ example: 'Contenido de texto' })
    content: string;

    @Column({ type: 'varchar', length: DBLength.path, nullable: true })
    @ApiPropertyOptional({ example: 'image.jpg' })
    image: string;

    @Column({ type: 'varchar', length: DBLength.path, nullable: true })
    @ApiPropertyOptional({ example: 'identifier' })
    imagePublicId: string;

    @Column({ type: 'json', nullable: true })
    @ApiPropertyOptional({ example: "{ align:1, width:100, height:100 }" })
    details: BlockDetails;

    @Column({ type: 'boolean', default: true })
    @ApiPropertyOptional({ example: true, default: true })
    isActive: boolean;

    @CreateDateColumn({ comment: 'Fecha y hora de creación' })
    @ApiPropertyOptional({ example: '2024-10-10 12:00:00' })
    created_at: Date | string;

    @UpdateDateColumn({ comment: 'Fecha y hora de modificación' })
    @ApiPropertyOptional({ example: '2024-10-10 12:30:00' })
    updated_at: Date | string;

    @ManyToOne(() => Publication, publication => publication.blocks)
    @JoinColumn({ name: 'publication_id' })
    publication: Publication;
}
