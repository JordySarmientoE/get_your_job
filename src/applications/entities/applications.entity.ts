import { Exclude } from "class-transformer";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';
import { Publications } from '../../publications/entities/publications.entity';

@Entity()
export class Applications {
    @PrimaryGeneratedColumn()
    id: number;
    @Exclude()
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @Exclude()
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
    @ManyToOne(() => User, (user) => user.applications)
    user: User;
    @ManyToOne(() => Publications, (publication) => publication.applications)
    publication: Publications;
}
