import { Injectable } from '@nestjs/common';
import { CreateExamQuestionDto } from '../dto/create-exam-question.dto';
import ExamQuestionRepository from '../repositories/exam-questions.repository';
import { UpdateExamQuestionDto } from '../dto/update-exam-question.dto';
import { UpdateResult } from 'typeorm';
import { ExamQuestion } from '../entities/exam-question.entity';

@Injectable()
export class ExamQuestionsService {
  constructor(private readonly examQuestionRepo: ExamQuestionRepository) {}

  async create(data: CreateExamQuestionDto) {
    return this.examQuestionRepo.create(data);
  }

  async getExamDetail(examId: number): Promise<ExamQuestion[]> {
    return this.examQuestionRepo.getExamDetail(examId);
  }

  async submitExamQuestion(data: UpdateExamQuestionDto): Promise<UpdateResult> {
    return this.examQuestionRepo.submitExamQuestion(data);
  }
}
