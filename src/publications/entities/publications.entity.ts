import { Exclude } from "class-transformer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PublicationDetail } from "./publication_detail.entity";
import { User } from '../../users/entities/user.entity';
import { Applications } from '../../applications/entities/applications.entity';

@Entity()
export class Publications {
    @PrimaryGeneratedColumn()
    id: number;
    @Exclude()
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @Exclude()
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
    @OneToOne(() => PublicationDetail, (publication) => publication.publication)
    @JoinColumn({ name: 'publication_detail_id' })
    publication_detail: PublicationDetail;
    @ManyToOne(() => User, (user) => user.publications)
    owner: User;
    @OneToMany(() => Applications, (applications) => applications.publication)
    applications: Applications[];
}
