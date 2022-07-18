import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PublicationDetail } from './publication_detail.entity';

@Entity()
export class PublicationDay {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 255 })
    name: string;
    @Exclude()
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @Exclude()
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
    @OneToMany(() => PublicationDetail, (publication) => publication.day_type)
    publications: PublicationDetail[]
}
