import { Module } from '@nestjs/common';
import { ExamsController } from './controllers/exams.controller';
import { ExamsService } from './services/exams.service';
import { ChallengesModule } from '../challenges/challenges.module';
import { QuestionsModule } from '../questions/questions.module';
import { ExamQuestionsModule } from '../exam-questions/exam-questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import ExamRepository from './repositories/exams.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam]),
    ChallengesModule,
    QuestionsModule,
    ExamQuestionsModule,
  ],
  controllers: [ExamsController],
  providers: [ExamsService, ExamRepository],
})
export class ExamsModule {}
