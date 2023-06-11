import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { NOT_FOUND } from 'src/commons/constants/error-messages.constants';
import { IPaginationOption, IResponse } from 'src/commons/interfaces';
import { UpdateResult } from 'typeorm';
import ChallengeRepository from './challenges.repository';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { IChallenge } from './interfaces';
import { STATUS } from 'src/commons/constants/variables.constants';

@Injectable()
export class ChallengesService {
  constructor(private readonly challengeRepo: ChallengeRepository) {}

  async create(
    data: CreateChallengeDto,
    createdBy: number
  ): Promise<IResponse<IChallenge>> {
    const result = await this.challengeRepo.create(data, createdBy);

    return {
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }

  async findAll(
    option: IPaginationOption,
    isAdmin: boolean
  ): Promise<IResponse<IChallenge[]>> {
    const result = await this.challengeRepo.findAll(option, isAdmin);

    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  async findAllByCondition(
    option: IPaginationOption,
    condition: Partial<CreateChallengeDto>,
    isAdmin: boolean
  ): Promise<IResponse<IChallenge[]>> {
    const result = await this.challengeRepo.findAllByCondition(
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
    condition: Partial<IChallenge>,
    isAdmin: boolean
  ): Promise<IResponse<IChallenge>> {
    const result = await this.challengeRepo.findOneByConditions(
      condition,
      isAdmin
    );

    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  async update(
    challengeId: number,
    data: Partial<CreateChallengeDto>
  ): Promise<UpdateResult> {
    return this.challengeRepo.update(challengeId, data);
  }

  async changeStatus(
    challengeId: number,
    status: STATUS
  ): Promise<UpdateResult> {
    const isExist = await this.findOneByConditions({ id: challengeId }, true);
    if (!isExist) {
      throw new BadRequestException(NOT_FOUND);
    }
    return this.challengeRepo.update(challengeId, { is_active: status });
  }
}
