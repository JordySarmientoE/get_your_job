import { DataSource } from 'typeorm';
import { ICommon } from '../common/common.interfaces';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: ICommon.PHOTO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [ICommon.DATA_SOURCE],
  },
];