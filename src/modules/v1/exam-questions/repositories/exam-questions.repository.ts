import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ExamQuestion } from '../entities/exam-question.entity';
import { CreateExamQuestionDto } from '../dto/create-exam-question.dto';
import { UpdateExamQuestionDto } from '../dto/update-exam-question.dto';

@Injectable()
export default class ExamQuestionRepository {
  constructor(
    @InjectRepository(ExamQuestion)
    private readonly dataSource: Repository<ExamQuestion>
  ) {}

  async create(data: CreateExamQuestionDto) {
    return this.dataSource.save({
      exam_id: data.examId,
      question_id: data.questionId,
      content: data.content,
      answers: data.answers,
    });
  }

  async getExamDetail(examId: number): Promise<ExamQuestion[]> {
    return this.dataSource
      .createQueryBuilder('exam-question')
      .leftJoin('exam-question.question', 'question')
      .where('exam_id =:id', { id: examId })
      .getMany();
  }

  async submitExamQuestion(data: UpdateExamQuestionDto): Promise<UpdateResult> {
    return this.dataSource
      .createQueryBuilder()
      .update(ExamQuestion)
      .set({ user_answered: data.user_answered, status: data.status })
      .where({ id: data.id })
      .execute();
  }
}
