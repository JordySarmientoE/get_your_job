import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { Studies } from '../entities/studies.entity';

export const studiesProviders = [
  {
    provide: ICommon.STUDY_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Studies),
    inject: [ICommon.DATA_SOURCE],
  },
];