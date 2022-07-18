import { Module } from '@nestjs/common';
import { StudiesController } from './controllers/studies.controller';
import { StudyStatusController } from './controllers/study_status.controller';
import { StudyTypeController } from './controllers/study_type.controller';
import { StudyTypeService } from './services/study_type.service';
import { StudiesService } from './services/studies.service';
import { StudyStatusService } from './services/study_status.service';
import { studiesProviders } from './providers/studies.provider';
import { studyTypeProviders } from './providers/study_type.provider';
import { studyStatusProviders } from './providers/study_status.provider';

@Module({
  controllers: [StudiesController, StudyStatusController, StudyTypeController],
  providers: [StudyTypeService, StudiesService, StudyStatusService,
    ...studiesProviders,
    ...studyTypeProviders,
    ...studyStatusProviders
  ]
})
export class StudiesModule {}
