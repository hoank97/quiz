import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExamQuestionDto } from '../dto/create-exam-question.dto';
import { ExamQuestionsService } from '../services/exam-questions.service';

@Controller('exam-questions')
@ApiTags('Exam-Question')
export class ExamQuestionsController {
  constructor(private readonly examQuestionsService: ExamQuestionsService) {}

  @Post()
  async create(@Body() createExamQuestionDto: CreateExamQuestionDto) {
    return this.examQuestionsService.create(createExamQuestionDto);
  }
}
