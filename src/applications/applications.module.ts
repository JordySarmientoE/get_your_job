import { Module } from '@nestjs/common';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsController } from './controllers/applications.controller';
import { applicationsProviders } from './providers/publications.provider';

@Module({
  providers: [ApplicationsService,
    ...applicationsProviders],
  controllers: [ApplicationsController]
})
export class ApplicationsModule {}
