import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LanguageLevel } from './language-level.entity';
import { LanguageCommon } from './language-common.entity';

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;
    @ManyToOne(() => LanguageLevel, (language_level) => language_level.written_levels)
    written_level: LanguageLevel;
    @ManyToOne(() => LanguageLevel, (language_level) => language_level.oral_levels)
    oral_level: LanguageLevel;
    @Exclude()
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @Exclude()
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
    @ManyToOne(() => LanguageCommon, (language_common) => language_common.user_languages)
    language_common: LanguageCommon;
}
