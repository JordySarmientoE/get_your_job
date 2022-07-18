import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { PublicationDetail } from '../entities/publication_detail.entity';

export const publicationDetailProviders = [
  {
    provide: ICommon.PUBLICATION_DETAIL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PublicationDetail),
    inject: [ICommon.DATA_SOURCE],
  },
];