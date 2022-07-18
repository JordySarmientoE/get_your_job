import { Module } from '@nestjs/common';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';
import { companyProviders } from './providers/user.provider';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, ...companyProviders]
})
export class CompaniesModule {}
