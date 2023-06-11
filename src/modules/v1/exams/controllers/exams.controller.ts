import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/commons/constants/variables.constants';
import { Roles } from 'src/commons/decorators/roles.decorators';
import JwtAccessGuard from 'src/commons/guards/jwt-access.guard';
import { RolesGuard } from 'src/commons/guards/roles.guard';
import { IResponse } from 'src/commons/interfaces';
import { SubmitExamDto } from '../dto/submit.dto';
import { IExam, IHistoryExam } from '../interfaces';
import { ExamsService } from '../services/exams.service';
import { Exam } from '../entities/exam.entity';

@Controller('exams')
@ApiTags('Exams')
@ApiBearerAuth()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Challenge Id',
  })
  @Get('challenge/:id')
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  @ApiConsumes('application/x-www-form-urlencoded')
  async takeExam(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req
  ): Promise<IResponse<IExam>> {
    const result = await this.examsService.takeExam(id, req.user.id);

    return {
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }

  @Post('submit')
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  async submitExam(@Body() data: SubmitExamDto) {
    const result = await this.examsService.submitExam(data);

    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @Get()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  async getListExamByUserId(@Req() req): Promise<IResponse<Exam[]>> {
    const data = await this.examsService.getListExamByUserId(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'exam Id',
  })
  @Get(':id')
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  async getExamResult(
    @Param('id', ParseIntPipe) id: number,
    @Req() req
  ): Promise<IResponse<IHistoryExam>> {
    const data = await this.examsService.getExamResult(id, req.user.id);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
