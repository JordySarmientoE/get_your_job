import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Companies {
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
    @OneToMany(() => User, (role) => role.company)
    users: User[];
}