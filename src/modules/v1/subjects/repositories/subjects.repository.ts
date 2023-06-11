import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSubjectDto } from '../dto/create-subject.dto';
import { Subject } from '../entities/subject.entity';
import { ISubject } from '../interfaces';
import { IPaginationOption } from 'src/commons/interfaces';
import { UNIT_PEER_PAGE } from 'src/commons/constants/variables.constants';
import { Challenge } from '../../challenges/entities/challenge.entity';

@Injectable()
export default class SubjectRepository {
  constructor(
    @InjectRepository(Subject)
    private readonly model: Repository<Subject>
  ) {}

  async create(data: CreateSubjectDto, userId: number): Promise<ISubject> {
    return this.model.save({
      ...data,
      created_by: userId,
      is_active: data.is_active,
    });
  }

  async findAll(
    option: IPaginationOption,
    isAdmin: boolean
  ): Promise<[ISubject[], number]> {
    const query = this.model
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.challenges', 'challenge')
      .leftJoin('subject.questions', 'questions')
      .loadRelationCountAndMap('subject.numberOfQuestions', 'subject.questions')
      .skip(option.offset)
      .take(UNIT_PEER_PAGE);
    if (!isAdmin) {
      query.where({ is_active: true });
    }
    return query.getManyAndCount();
  }

  async findAllByCondition(
    option: IPaginationOption,
    condition: Partial<CreateSubjectDto>,
    isAdmin: boolean
  ): Promise<ISubject[]> {
    const query = this.model
      .createQueryBuilder()
      .where(condition)
      .skip(option.offset)
      .take(UNIT_PEER_PAGE);
    if (!isAdmin) {
      query.where({ is_active: true });
    }

    return query.getMany();
  }

  async findOneByConditions(
    condition: Partial<CreateSubjectDto>,
    isAdmin: boolean
  ): Promise<ISubject> {
    const query = this.model.createQueryBuilder().where(condition);
    if (!isAdmin) {
      query.where({ is_active: true });
    }

    return query.getOne();
  }

  async getFavoriteSubjects() {
    return this.model
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.challenges', 'challenge')
      .loadRelationCountAndMap('challenge.numsOfExam', 'challenge.exam')
      .getMany();
  }

  async update(
    subjectId: number,
    data: Partial<CreateSubjectDto>,
    createdBy: number
  ): Promise<UpdateResult> {
    return this.model
      .createQueryBuilder()
      .update(Subject)
      .set({ ...data, updated_by: createdBy })
      .where('id =:id', { id: subjectId })
      .execute();
  }

  getAll(): Promise<Subject[]> {
    return this.model.find();
  }

  findBySubjectId(subjectId: number) {
    return this.model.findOne({
      where: { id: subjectId },
    });
  }
}
