import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { Companies } from '../entities/companies.entity';

export const companyProviders = [
  {
    provide: ICommon.COMPANY_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Companies),
    inject: [ICommon.DATA_SOURCE],
  },
];