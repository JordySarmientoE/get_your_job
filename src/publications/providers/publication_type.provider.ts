import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { PublicationType } from '../entities/publication_type.entity';

export const publicationTypeProviders = [
  {
    provide: ICommon.PUBLICATION_TYPE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PublicationType),
    inject: [ICommon.DATA_SOURCE],
  },
];