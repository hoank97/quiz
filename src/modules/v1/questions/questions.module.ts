import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionRepository } from './question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { SubjectsModule } from '../subjects/subjects.module';
import { IsAdminGuard } from './guards/is-admin.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Subject]), SubjectsModule],
  controllers: [QuestionsController],
  providers: [QuestionRepository, QuestionsService, IsAdminGuard],
  exports: [QuestionsService],
})
export class QuestionsModule {}
