import { ApiProperty } from '@nestjs/swagger';
import { IQuestionChoicesResponse } from '../../questions/types/question-choices.response';
import { QUESTION_STATUS } from '../constants';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateExamQuestionDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  readonly user_answered: IQuestionChoicesResponse;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  readonly status: QUESTION_STATUS;
}
