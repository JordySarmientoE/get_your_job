import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../../role/entities/role.entity';
import { UserInfo } from './user_info.entity';
import { UserProfile } from './user_profile.entity';
import { Companies } from '../../companies/entities/companies.entity';
import { Publications } from '../../publications/entities/publications.entity';
import { Applications } from '../../applications/entities/applications.entity';
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
    @OneToOne(() => UserInfo, (info) => info.user)
    @JoinColumn({ name: 'user_info_id' })
    user_info: UserInfo;
    @OneToOne(() => UserProfile, (info) => info.user)
    @JoinColumn({ name: 'user_profile_id' })
    user_profile: UserProfile;
    @ManyToOne(() => Companies, (company) => company.users)
    company: Companies;
    @OneToMany(() => Publications, (publication) => publication.owner)
    publications: Publications[];
    @OneToMany(() => Applications, (applications) => applications.user)
    applications: Applications[];
}