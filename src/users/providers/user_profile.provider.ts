import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { UserProfile } from '../entities/user_profile.entity';

export const userProfileProviders = [
  {
    provide: ICommon.USER_PROFILE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserProfile),
    inject: [ICommon.DATA_SOURCE],
  },
];