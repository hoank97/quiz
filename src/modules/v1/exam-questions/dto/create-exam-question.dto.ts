import { ApiProperty } from '@nestjs/swagger';
import { IQuestionChoicesResponse } from '../../questions/types/question-choices.response';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExamQuestionDto {
  @ApiProperty({
    required: true,
    type: Number,
    description: 'Exam Id',
  })
  @Type(() => Number)
  @IsNumber()
  readonly examId: number;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'Question Id',
  })
  @Type(() => Number)
  @IsNumber()
  readonly questionId: number;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Question content',
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    required: true,
    description: 'Question answer',
  })
  readonly answers: IQuestionChoicesResponse[];
}
