import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { PublicationDay } from '../entities/publication_day.entity';

export const publicationDayProviders = [
  {
    provide: ICommon.PUBLICATION_DAY_TYPE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PublicationDay),
    inject: [ICommon.DATA_SOURCE],
  },
];