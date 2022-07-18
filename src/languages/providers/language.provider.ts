import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { Language } from '../entities/language.entity';

export const languageProviders = [
  {
    provide: ICommon.LANGUAGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Language),
    inject: [ICommon.DATA_SOURCE],
  },
];