import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Publications } from "./publications.entity";
import { PublicationDay } from "./publication_day.entity";
import { PublicationType } from './publication_type.entity';

@Entity()
export class PublicationDetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 255 })
    name: string;
    @Column({ type: 'varchar', length: 255 })
    description: string;
    @Column({ type: 'numeric', nullable: true })
    salary: number;
    @Column({ type: 'varchar', length: 255, nullable: true })
    address: string;
    @Exclude()
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @Exclude()
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
    @ManyToOne(() => PublicationType, (publication) => publication.publications)
    type: PublicationType;
    @ManyToOne(() => PublicationDay, (publication) => publication.publications)
    day_type: PublicationDay;
    @OneToOne(() => Publications, (publication) => publication.publication_detail)
    publication: Publications;
}