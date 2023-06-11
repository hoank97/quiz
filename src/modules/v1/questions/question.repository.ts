import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { SubjectsService } from '../subjects/subjects.service';
import { IUser } from '../users/interfaces';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { IQuestionResponse } from './types/question-list.response';
import { QUESTION_STATUS } from './constants';
import SubjectRepository from '../subjects/repositories/subjects.repository';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question) private readonly repo: Repository<Question>,
    private readonly subjectService: SubjectsService,
    private readonly subjectRepo: SubjectRepository
  ) {}

  find(filter: FindManyOptions<Question>): Promise<Question[]> {
    return this.repo.find(filter);
  }

  findOne(filter: FindOneOptions<Question>): Promise<Question> {
    return this.repo.findOne(filter);
  }

  getTotalRecords(): Promise<number> {
    return this.repo.count({ select: ['id'] });
  }

  async store(payload: CreateQuestionDto, user: IUser) {
    const question = this.repo.create({
      content: payload.content,
      type: payload.type,
      created_by: user.id,
      updated_by: user.id,
      subjects: [],
      answer: payload.answer,
      is_active: payload.is_active || true,
      status: payload.status || QUESTION_STATUS.VERIFIED,
    });
    for (const id of payload.subjectIds) {
      const subject = await this.subjectService.findOne(id);
      question.subjects.push(subject);
    }
    return this.repo.save(question);
  }

  async update(id: number, payload: UpdateQuestionDto, user: IUser) {
    const question = await this.findOne({
      where: { id },
      relations: {
        subjects: true,
      },
    });
    for (const key in payload) {
      if (key === 'subjectIds') {
        const subjects = [];
        for (const sId of payload.subjectIds) {
          const subject = await this.subjectRepo.findBySubjectId(sId);
          if (subject) {
            subjects.push(subject);
          }
        }
        question.subjects = subjects;
      } else {
        question[key] = payload[key];
      }
    }
    question.updated_by = user.id;
    return this.repo.save(question);
  }

  async getRandomActiveQuestions(
    number: number,
    subjectId: number
  ): Promise<IQuestionResponse[]> {
    return this.repo
      .createQueryBuilder('question')
      .innerJoin('question.subjects', 'subjects')
      .where({ is_active: true })
      .andWhere('subjects.id =:id', { id: subjectId })
      .orderBy('RAND()')
      .take(number)
      .getMany();
  }

  delete(id: number) {
    return this.repo.softDelete({ id });
  }
}
