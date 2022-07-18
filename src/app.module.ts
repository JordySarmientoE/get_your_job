import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { LanguagesModule } from './languages/languages.module';
import { StudiesModule } from './studies/studies.module';
import { CompaniesModule } from './companies/companies.module';
import { PublicationsModule } from './publications/publications.module';
import { ApplicationsModule } from './applications/applications.module';
import config from './config';
import configSchema from './configSchema';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [config],
    validationSchema: configSchema
  }), UsersModule, AuthModule, RoleModule, LanguagesModule, StudiesModule, CompaniesModule, PublicationsModule, ApplicationsModule]
})
export class AppModule {}
