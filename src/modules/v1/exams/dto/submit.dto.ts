import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { IQuestionSubmit } from '../../questions/types/request.type';

export class SubmitExamDto {
  @ApiProperty({
    required: true,
    type: Number,
    description: 'Exam Id',
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  readonly examId: number;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'Time to finish the exam (second)',
    example: 600,
  })
  @Type(() => Number)
  @IsNumber()
  readonly spendTime: number;

  @ApiProperty({
    required: true,
    description: 'Question',
    example: [
      {
        id: 1,
        type: 1,
        answer: [
          {
            content: 'Answer no. 1',
            correct: false,
          },
          {
            content: 'Answer no. 2',
            correct: true,
          },
        ],
      },
    ],
  })
  @IsNotEmpty()
  readonly question: IQuestionSubmit[];
}
