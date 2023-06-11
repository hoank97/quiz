import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import JwtAccessGuard from 'src/commons/guards/jwt-access.guard';
import {
  FIRST_PAGE,
  ROLE,
  STATUS,
  UNIT_PEER_PAGE,
} from 'src/commons/constants/variables.constants';
import { UpdateResult } from 'typeorm';
import { IPaginationOption, IResponse } from 'src/commons/interfaces';
import { IChallenge } from './interfaces';
import { RolesGuard } from 'src/commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorators';

@Controller('challenges')
@ApiTags('Challenges')
@ApiBearerAuth()
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  async create(
    @Body() challengeInfo: CreateChallengeDto,
    @Req() req
  ): Promise<IResponse<IChallenge>> {
    const createdBy = req.user.id;
    return this.challengesService.create(challengeInfo, createdBy);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  async findAll(
    @Query('page') page: string,
    @Req() data
  ): Promise<IResponse<IChallenge[]>> {
    const isAdmin = data.user.role === ROLE.ADMIN;
    const option: IPaginationOption = {
      page: Number(page) || FIRST_PAGE,
      offset: UNIT_PEER_PAGE * (Number(page) - 1) || 0,
    };

    return this.challengesService.findAll(option, isAdmin);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Challenge Id',
  })
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) challengeId: number,
    @Req() data
  ) {
    const isAdmin = data.user.role === ROLE.ADMIN;

    return this.challengesService.findOneByConditions(
      { id: challengeId },
      isAdmin
    );
  }

  @Patch(':id')
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @ApiConsumes('application/x-www-form-urlencoded')
  async update(
    @Param('id', new ParseIntPipe()) challengeId: number,
    @Body() data: UpdateChallengeDto
  ): Promise<UpdateResult> {
    return this.challengesService.update(challengeId, data);
  }

  @Delete(':id')
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  async inActive(
    @Param('id', new ParseIntPipe()) challengeId: number
  ): Promise<UpdateResult> {
    return this.challengesService.changeStatus(challengeId, STATUS.INACTIVE);
  }
}
