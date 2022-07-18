import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 255 })
    name: string;
    @Column({ type: 'varchar', length: 255 })
    lastname: string;
    @Column({ type: 'varchar', length: 255 })
    dni: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    civil_status: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    genre: string;
    @Column({ type: 'timestamptz', nullable: true})
    birthday: Date;
    @Column({ type: 'varchar', length: 255, nullable: true })
    phone: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    address: string;
    @Column({ type: 'varchar', length: 255 })
    nacionalty: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    photo: string;
    @OneToOne(() => User, (user) => user.user_info)
    user: User;
    @Exclude()
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @Exclude()
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
}
