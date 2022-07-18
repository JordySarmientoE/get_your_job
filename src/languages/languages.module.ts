import { Module } from '@nestjs/common';
import { LanguageController } from './controllers/language.controller';
import { LanguageLevelController } from './controllers/language-level.controller';
import { LanguageService } from './services/language.service';
import { LanguageLevelService } from './services/language-level.service';
import { LanguageCommonService } from './services/language-common.service';
import { LanguageCommonController } from './controllers/language-common.controller';
import { languageCommonProviders } from './providers/language-common.provider';
import { languageLevelProviders } from './providers/language-level.provider';
import { languageProviders } from './providers/language.provider';

@Module({
  controllers: [LanguageController, LanguageLevelController, LanguageCommonController],
  providers: [LanguageService, LanguageLevelService, LanguageCommonService,
    ...languageCommonProviders,
    ...languageLevelProviders,
    ...languageProviders]
})
export class LanguagesModule { }
