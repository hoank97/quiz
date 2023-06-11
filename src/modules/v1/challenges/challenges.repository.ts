import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IPaginationOption } from 'src/commons/interfaces';
import { Challenge } from './entities/challenge.entity';
import { IChallenge } from './interfaces';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { DEFAULT_LIMIT } from '../questions/constants';

@Injectable()
export default class ChallengeRepository {
  constructor(
    @InjectRepository(Challenge)
    private readonly model: Repository<Challenge>
  ) {}

  async create(
    data: CreateChallengeDto,
    createdBy: number
  ): Promise<IChallenge> {
    return this.model.save({ ...data, created_by: createdBy });
  }

  async findAll(
    options: IPaginationOption,
    isAdmin: boolean
  ): Promise<IChallenge[]> {
    const query = this.model
      .createQueryBuilder()
      .take(DEFAULT_LIMIT)
      .skip(options.offset);
    if (!isAdmin) {
      query.where({ is_active: true });
    }
    return query.getMany();
  }

  async findAllByCondition(
    options: IPaginationOption,
    condition: Partial<CreateChallengeDto>,
    isAdmin: boolean
  ): Promise<IChallenge[]> {
    const query = this.model
      .createQueryBuilder()
      .where(condition)
      .skip(options.offset)
      .take(options.limit);
    if (!isAdmin) {
      query.where({ is_active: true });
    }

    return query.getMany();
  }

  async findOneByConditions(
    conditions: Partial<CreateChallengeDto>,
    isAdmin: boolean
  ): Promise<IChallenge> {
    const query = this.model.createQueryBuilder().where(conditions);
    if (!isAdmin) {
      query.where({ is_active: true });
    }

    return query.getOne();
  }

  async update(
    challengeId: number,
    data: Partial<CreateChallengeDto>
  ): Promise<UpdateResult> {
    return this.model
      .createQueryBuilder()
      .update(Challenge)
      .set(data)
      .where('id =:id', { id: challengeId })
      .execute();
  }
}
