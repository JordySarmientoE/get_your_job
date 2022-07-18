import { DataSource } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { StudyStatus } from '../entities/study_status.entity';

export const studyStatusProviders = [
  {
    provide: ICommon.STUDY_STATUS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StudyStatus),
    inject: [ICommon.DATA_SOURCE],
  },
];