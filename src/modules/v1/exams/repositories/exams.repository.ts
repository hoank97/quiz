import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Exam } from '../entities/exam.entity';
import { IExamResult, IExamSubmit } from '../interfaces';

@Injectable()
export default class ExamRepository {
  constructor(
    @InjectRepository(Exam)
    private readonly dataSource: Repository<Exam>
  ) {}

  async create(challengeId: number, userId: number): Promise<IExamResult> {
    return this.dataSource.save({
      challenge_id: challengeId,
      user_id: userId,
    });
  }

  async getChallengeInfoByExamId(examId: number) {
    return this.dataSource
      .createQueryBuilder('exams')
      .leftJoinAndSelect('exams.challenge', 'challenge')
      .where({ id: examId })
      .getOne();
  }

  async update(data: IExamSubmit): Promise<UpdateResult> {
    return this.dataSource
      .createQueryBuilder()
      .update(Exam)
      .set({
        score: data.score,
        spend_time: data.spendTime,
        status: data.status,
      })
      .where({ id: data.id })
      .execute();
  }

  async getListExamByUserId(userId: number): Promise<Exam[]> {
    return this.dataSource
      .createQueryBuilder()
      .where({ user_id: userId })
      .getMany();
  }

  async getExamResult(
    examId: number,
    userId: number
  ): Promise<Exam | undefined> {
    return this.dataSource
      .createQueryBuilder('exam')
      .leftJoinAndSelect('exam.challenge', 'challenge')
      .where('exam.user_id =:id', { id: userId })
      .andWhere('exam.id =:examId', { examId: examId })
      .getOne();
  }
}
