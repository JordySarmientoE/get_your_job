import { Module } from '@nestjs/common';
import { PublicationsController } from './controllers/publications.controller';
import { PublicationDetailController } from './controllers/publication_detail.controller';
import { PublicationTypeController } from './controllers/publication_type.controller';
import { PublicationDayController } from './controllers/publication_day.controller';
import { PublicationDayService } from './services/publication_day.service';
import { PublicationsService } from './services/publications.service';
import { PublicationDetailService } from './services/publication_detail.service';
import { PublicationTypeService } from './services/publication_type.service';
import { publicationsProviders } from './providers/publications.provider';
import { publicationTypeProviders } from './providers/publication_type.provider';
import { publicationDayProviders } from './providers/publication_day.provider';
import { publicationDetailProviders } from './providers/publication_detail.provider';

@Module({
  controllers: [PublicationsController, PublicationDetailController, PublicationTypeController, PublicationDayController],
  providers: [PublicationDayService, PublicationsService, PublicationDetailService, PublicationTypeService,
    ...publicationsProviders,
    ...publicationTypeProviders,
    ...publicationDayProviders,
    ...publicationDetailProviders]
})
export class PublicationsModule {}
