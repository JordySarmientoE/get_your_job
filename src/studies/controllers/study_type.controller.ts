import { Controller } from '@nestjs/common';
import { StudyTypeService } from '../services/study_type.service';

@Controller('study-type')
export class StudyTypeController {
    constructor(private studyTypeService: StudyTypeService){}
}
