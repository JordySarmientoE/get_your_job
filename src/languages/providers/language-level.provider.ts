import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { LanguageLevel } from '../entities/language-level.entity';

export const languageLevelProviders = [
  {
    provide: ICommon.LANGUAGE_LEVEL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(LanguageLevel),
    inject: [ICommon.DATA_SOURCE],
  },
];