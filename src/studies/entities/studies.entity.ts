import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StudyStatus } from './study_status.entity';
import { StudyType } from "./study_type.entity";

@Entity()
export class Studies {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 255 })
    name: string;
    @Column({ type: 'varchar', length: 255 })
    institution: string;
    @Column({ type: 'varchar', length: 255 })
    country: string;
    @Column({ type: 'boolean', default: false })
    present: boolean;
    @Column({ type: 'timestamptz'})
    start_date: Date;
    @Column({ type: 'timestamptz'})
    end_date: Date;
    @Exclude()
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @Exclude()
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
    @ManyToOne(() => StudyType, (study_type) => study_type.studies)
    type: StudyType;
    @ManyToOne(() => StudyStatus, (study_status) => study_status.studies)
    status: StudyStatus;
}
