import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  HttpStatus,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import JwtAccessGuard from 'src/commons/guards/jwt-access.guard';
import { IQuestionListFilter, IRequestAuth } from './types/request.type';
import {
  CreatedQuestionDto,
  QuestionResponseDto,
} from './dto/repsonses/question-response.dto';
import {
  ResponseDto,
  SingleRecordResponseDto,
} from './dto/repsonses/response.dto';
import { IsAdminGuard } from './guards/is-admin.guard';
import { QuestionChoicesResponseDto } from './dto/repsonses/question-choices.response.dto';
import { IResponse } from '../../../commons/interfaces';
import { IQuestionResponse } from './types/question-list.response';
import { IQuestionDetail } from './types/question.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('questions')
@ApiTags('Questions')
@ApiExtraModels(
  ResponseDto,
  SingleRecordResponseDto,
  QuestionResponseDto,
  CreatedQuestionDto,
  QuestionChoicesResponseDto
)
@ApiBearerAuth()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('')
  @UseGuards(JwtAccessGuard)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(CreatedQuestionDto),
            },
          },
        },
      ],
    },
  })
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @Req() req: IRequestAuth
  ): Promise<ResponseDto<CreatedQuestionDto>> {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.questionsService.create(createQuestionDto, req.user),
    };
  }

  @Get()
  @UseGuards(JwtAccessGuard)
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 2,
  })
  @ApiQuery({
    name: 'type',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(QuestionResponseDto),
              },
            },
          },
        },
      ],
    },
  })
  findAll(
    @Query() filter: IQuestionListFilter,
    @Req() req: IRequestAuth
  ): Promise<IResponse<IQuestionResponse[]>> {
    return this.questionsService.findAll(filter, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAccessGuard)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SingleRecordResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(QuestionResponseDto) },
          },
        },
      ],
    },
  })
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<IResponse<IQuestionDetail>> {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAccessGuard, IsAdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Req() req: IRequestAuth
  ) {
    return this.questionsService.update(+id, updateQuestionDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAccessGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.remove(id);
  }

  @Post('load-master-data')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(FileInterceptor('file'))
  async loadMasterDataFromFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: IRequestAuth
  ) {
    const data = JSON.parse(file.buffer.toString('utf8'));
    return this.questionsService.loadMasterData(data, req.user);
  }
}
