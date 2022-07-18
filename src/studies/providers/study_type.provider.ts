import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { StudyType } from '../entities/study_type.entity';

export const studyTypeProviders = [
  {
    provide: ICommon.STUDY_TYPE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StudyType),
    inject: [ICommon.DATA_SOURCE],
  },
];