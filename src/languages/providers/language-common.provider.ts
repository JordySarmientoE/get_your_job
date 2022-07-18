import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { LanguageCommon } from '../entities/language-common.entity';

export const languageCommonProviders = [
  {
    provide: ICommon.LANGUAGE_COMMON_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(LanguageCommon),
    inject: [ICommon.DATA_SOURCE],
  },
];