import { Module } from '@nestjs/common';
import { ExamQuestionsService } from './services/exam-questions.service';
import { ExamQuestionsController } from './controllers/exam-questions.controller';
import ExamQuestionRepository from './repositories/exam-questions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamQuestion } from './entities/exam-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamQuestion])],
  controllers: [ExamQuestionsController],
  providers: [ExamQuestionsService, ExamQuestionRepository],
  exports: [ExamQuestionsService],
})
export class ExamQuestionsModule {}
