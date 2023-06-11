import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';
import { FindManyOptions, FindOptionsWhere, ILike } from 'typeorm';
import { IQuestionResponse } from './types/question-list.response';
import { IUser } from '../users/interfaces';
import { IQuestionListFilter } from './types/request.type';
import { Question } from './entities/question.entity';
import { QUESTION_STATUS, QUESTION_TYPE, USER_ROLE } from './constants';
import {
  FIRST_PAGE,
  UNIT_PEER_PAGE,
} from '../../../commons/constants/variables.constants';
import { IResponse } from '../../../commons/interfaces';
import { IQuestionDetail } from './types/question.response';
import { SubjectsService } from '../subjects/subjects.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly subjectService: SubjectsService
  ) {}

  async create(dto: CreateQuestionDto, user: IUser) {
    const payload = {
      content: dto.content,
      type: dto.type,
      answer: dto.answer,
      subjectIds: dto.subjectIds,
      is_active: dto.is_active || true,
      status: dto.status || QUESTION_STATUS.VERIFIED,
    };
    return this.questionRepo.store(payload, user);
  }

  async findAll(
    filter: IQuestionListFilter,
    user: IUser
  ): Promise<IResponse<IQuestionResponse[]>> {
    const limit = UNIT_PEER_PAGE;
    const page = filter.page || FIRST_PAGE;
    const whereClause: FindOptionsWhere<Question> = {};
    if (filter.type) {
      whereClause.type = filter.type;
    }
    if (filter.term) {
      whereClause.content = ILike(filter.term);
    }
    const findOptions: FindManyOptions<Question> = {
      where: {
        ...whereClause,
      },
      skip: limit * (page - 1),
      take: limit,
      relations: {
        subjects: true,
      },
    };
    if (filter.status !== QUESTION_STATUS.VERIFIED && user.role !== 1) {
      throw new ForbiddenException();
    }
    const questions = await this.questionRepo.find(findOptions);
    const data: IQuestionResponse[] = [];
    for (const question of questions) {
      if (!filter.with_correct_answers) {
        question.answer = question.answer.map((a) => {
          return {
            content: a.content,
          };
        });
      }
      data.push(question);
    }

    const totalRecords = await this.questionRepo.getTotalRecords();

    return {
      statusCode: HttpStatus.OK,
      data,
      pagination: {
        total: totalRecords,
        currentPages: filter.page,
        perPage: UNIT_PEER_PAGE,
      },
    };
  }

  async findOne(id: number): Promise<IResponse<IQuestionDetail>> {
    const question = await this.questionRepo.findOne({
      where: { id },
      relations: {
        subjects: true,
      },
    });
    let data: IQuestionDetail = null;
    if (question) {
      data = {
        content: question.content,
        type: question.type,
        subjects: question.subjects,
        answer: question.answer,
        status: question.status,
        is_active: question.is_active,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async update(
    id: number,
    payload: UpdateQuestionDto,
    user: IUser
  ): Promise<IResponse<Question>> {
    if (
      user.role !== USER_ROLE.ADMIN &&
      (Object.keys(payload).includes('is_active') ||
        Object.keys(payload).includes('status'))
    ) {
      throw new ForbiddenException('Not allowed to modify these fields');
    }
    const updatedQuestion = await this.questionRepo.update(id, payload, user);
    return {
      statusCode: HttpStatus.OK,
      data: updatedQuestion,
    };
  }

  remove(id: number) {
    return this.questionRepo.delete(id);
  }

  async getRandomActiveQuestions(
    qty: number,
    subjectId: number
  ): Promise<IQuestionResponse[]> {
    return this.questionRepo.getRandomActiveQuestions(qty, subjectId);
  }

  async loadMasterData(data: any, user: IUser) {
    let rowsAffected = 0;
    for (const row of data) {
      const answer = [];
      const questionType = {
        Single_choice: QUESTION_TYPE.SINGLE_CHOICE,
        Multiple_choice: QUESTION_TYPE.MULTIPLE_CHOICE,
        Text: QUESTION_TYPE.TEXT,
      };
      for (const opt of row.option) {
        answer.push({
          content: opt.value,
          correct: opt.type === 'correct' || row['question type'] === 'Text',
        });
      }
      let subject = await this.subjectService.findOneByConditions(
        {
          name: row.subject,
        },
        true
      );
      if (!subject.data) {
        subject = await this.subjectService.create(
          {
            name: row.subject,
            description: '',
          },
          user.id
        );
      }
      const active = row.active === '✓';
      const status = {
        Accepted: QUESTION_STATUS.VERIFIED,
        Waiting: QUESTION_STATUS.PENDING,
      };
      await this.questionRepo.store(
        {
          content: row.content,
          answer,
          subjectIds: [subject.data.id],
          type: questionType[row['question type']],
          is_active: active,
          status: status[row['state']],
        },
        user
      );
      rowsAffected++;
    }
    return {
      statusCode: HttpStatus.CREATED,
      data: { rows_affected: rowsAffected },
    };
  }
}
