import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import {
  IPagination,
  IPaginationOption,
  IResponse,
} from 'src/commons/interfaces';
import { ISubject } from './interfaces';
import { UpdateResult } from 'typeorm';
import { NOT_FOUND } from 'src/commons/constants/error-messages.constants';
import {
  STATUS,
  UNIT_PEER_PAGE,
} from 'src/commons/constants/variables.constants';
import { ChallengesService } from '../challenges/challenges.service';
import { DEFAULT } from '../challenges/challenges.constants';
import { CreateChallengeDto } from '../challenges/dto/create-challenge.dto';
import SubjectRepository from './repositories/subjects.repository';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    private readonly subjectRepo: SubjectRepository,
    private readonly challengeService: ChallengesService
  ) {}

  async create(
    data: CreateSubjectDto,
    userId: number
  ): Promise<IResponse<ISubject>> {
    try {
      const result = await this.subjectRepo.create(data, userId);

      // Create default challenge
      // Transaction

      const dummyData: CreateChallengeDto = {
        ...DEFAULT,
        subject_id: result.id,
      };
      const defaultChallenge = await this.challengeService.create(
        dummyData,
        result.created_by
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: { ...result, challenges: [defaultChallenge.data] },
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll(
    option: IPaginationOption,
    isAdmin: boolean
  ): Promise<IResponse<ISubject[]>> {
    const [data, total] = await this.subjectRepo.findAll(option, isAdmin);
    const pagination: IPagination = {
      total,
      currentPages: option.page,
      perPage: UNIT_PEER_PAGE,
    };

    return {
      statusCode: HttpStatus.OK,
      data: data,
      pagination,
    };
  }

  async findAllByCondition(
    option: IPaginationOption,
    condition: Partial<CreateSubjectDto>,
    isAdmin: boolean
  ): Promise<IResponse<ISubject[]>> {
    const result = await this.subjectRepo.findAllByCondition(
      option,
      condition,
      isAdmin
    );

    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  async findOneByConditions(
    condition: Partial<ISubject>,
    isAdmin: boolean
  ): Promise<IResponse<ISubject>> {
    const result = await this.subjectRepo.findOneByConditions(
      condition,
      isAdmin
    );

    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  async getFavoriteSubjects() {
    const result = await this.subjectRepo.getFavoriteSubjects();

    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  async update(
    subjectId: number,
    data: Partial<CreateSubjectDto>,
    updatedBy: number
  ): Promise<UpdateResult> {
    return this.subjectRepo.update(subjectId, data, updatedBy);
  }

  async changeStatus(
    subjectId: number,
    updatedBy: number,
    status: STATUS
  ): Promise<UpdateResult> {
    const isExist = await this.findOneByConditions({ id: subjectId }, true);
    if (!isExist) {
      throw new BadRequestException(NOT_FOUND);
    }
    return this.subjectRepo.update(subjectId, { is_active: status }, updatedBy);
  }

  async findOne(id: number): Promise<Subject> {
    return this.subjectRepo.findBySubjectId(id);
  }
}
