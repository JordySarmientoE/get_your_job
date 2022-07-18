import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Studies } from "./studies.entity";

@Entity()
export class StudyType {
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
    @OneToMany(() => Studies, (study) => study.type)
    studies: Studies[]
}
