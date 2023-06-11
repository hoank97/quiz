import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  FIRST_PAGE,
  ROLE,
  STATUS,
  UNIT_PEER_PAGE,
} from 'src/commons/constants/variables.constants';
import JwtAccessGuard from 'src/commons/guards/jwt-access.guard';
import { IPaginationOption, IResponse } from 'src/commons/interfaces';
import { UpdateResult } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ISubject } from './interfaces';

import { SubjectsService } from './subjects.service';
import { Roles } from 'src/commons/decorators/roles.decorators';
import { RolesGuard } from 'src/commons/guards/roles.guard';

@Controller('subjects')
@ApiBearerAuth()
@ApiTags('Subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @ApiConsumes('application/x-www-form-urlencoded')
  async create(
    @Body() subjectInfo: CreateSubjectDto,
    @Req() data
  ): Promise<IResponse<ISubject>> {
    const createdBy = data.user.id;
    return this.subjectsService.create(subjectInfo, createdBy);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  async findAll(
    @Query('page') page: string,
    @Req() data
  ): Promise<IResponse<ISubject[]>> {
    const isAdmin = data.user.role === ROLE.ADMIN;
    const option: IPaginationOption = {
      page: Number(page) || FIRST_PAGE,
      offset: UNIT_PEER_PAGE * (Number(page) - 1) || 0,
    };

    return this.subjectsService.findAll(option, isAdmin);
  }

  @Get('favorite')
  @UseGuards(JwtAccessGuard)
  // @Roles(ROLE.ADMIN, ROLE.USER)
  async getFavoriteSubjects() {
    return this.subjectsService.getFavoriteSubjects();
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Subject Id',
  })
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) subjectId: number,
    @Req() data
  ) {
    const isAdmin = data.user.role === ROLE.ADMIN;

    return this.subjectsService.findOneByConditions({ id: subjectId }, isAdmin);
  }

  @Patch(':id')
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @ApiConsumes('application/x-www-form-urlencoded')
  async update(
    @Param('id', new ParseIntPipe()) subjectId: number,
    @Body() body: UpdateSubjectDto,
    @Req() data
  ): Promise<UpdateResult> {
    const updatedBy = data.user.id;

    return this.subjectsService.update(subjectId, body, updatedBy);
  }

  @Delete(':id')
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  async inActive(
    @Param('id', new ParseIntPipe()) subjectId: number,
    @Req() data
  ): Promise<UpdateResult> {
    const createdBy = data.user.id;

    return this.subjectsService.changeStatus(
      subjectId,
      createdBy,
      STATUS.INACTIVE
    );
  }
}
