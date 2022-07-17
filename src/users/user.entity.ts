import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../role/role.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
    @Exclude()
    @Column({ type: 'varchar', length: 255 })
    password: string;
    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
}