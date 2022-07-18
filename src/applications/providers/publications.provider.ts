import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { Applications } from '../entities/applications.entity';

export const applicationsProviders = [
  {
    provide: ICommon.APPLICATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Applications),
    inject: [ICommon.DATA_SOURCE],
  },
];