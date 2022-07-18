import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from './user.entity';

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'numeric', nullable: true })
    salary_preference: number;
    @Column({ type: 'varchar', length: 255, nullable: true })
    curriculum: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    job_goal: string;
    @OneToOne(() => User, (user) => user.user_profile)
    user: User;
    @Exclude()
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @Exclude()
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
}
