import { IQuestionResponse } from '../../types/question-list.response';
import {
  ApiHideProperty,
  ApiProperty,
  getSchemaPath,
  PartialType,
} from '@nestjs/swagger';
import { QuestionChoicesResponseDto } from './question-choices.response.dto';
import { Subject } from '../../../subjects/entities/subject.entity';
import { QuestionSubjectDto } from './question-subject.response.dto';
import { QUESTION_STATUS } from '../../constants';
import { Question } from '../../entities/question.entity';

export class QuestionResponseDto implements IQuestionResponse {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  type: number;

  @ApiProperty({
    type: [QuestionSubjectDto],
  })
  subjects: Subject[];

  @ApiProperty({
    example: 'What is the weight of the Earth?',
  })
  content: string;

  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(QuestionChoicesResponseDto),
    },
  })
  answer: QuestionChoicesResponseDto[];

  @ApiHideProperty()
  created_by: number;

  @ApiHideProperty()
  updated_by: number;

  @ApiProperty({
    example: QUESTION_STATUS.VERIFIED,
  })
  status: QUESTION_STATUS;
}

export class CreatedQuestionDto extends PartialType(Question) {}
