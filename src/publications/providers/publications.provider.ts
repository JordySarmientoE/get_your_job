import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { Publications } from '../entities/publications.entity';

export const publicationsProviders = [
  {
    provide: ICommon.PUBLICATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Publications),
    inject: [ICommon.DATA_SOURCE],
  },
];