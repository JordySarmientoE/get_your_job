import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { UserInfo } from '../entities/user_info.entity';

export const userInfoProviders = [
  {
    provide: ICommon.USER_INFO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserInfo),
    inject: [ICommon.DATA_SOURCE],
  },
];