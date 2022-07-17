import { DataSource } from 'typeorm';
import { ICommon } from '../common/common.interfaces';
import { Role } from './role.entity';

export const roleProviders = [
  {
    provide: ICommon.ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: [ICommon.DATA_SOURCE],
  },
];