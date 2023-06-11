import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuestionChoicesDto } from './question-choices.dto';
import { QUESTION_STATUS, QUESTION_TYPE } from '../constants';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'Explain the concept of inheritance in OOP',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 1,
  })
  @IsDefined()
  @IsNumber()
  @IsIn([1, 2, 3])
  type: QUESTION_TYPE;

  @ApiProperty({
    example: [1, 2, 3],
  })
  @IsDefined()
  @IsArray()
  @IsNumber({}, { each: true })
  subjectIds: number[];

  @ApiProperty({
    type: [QuestionChoicesDto],
    example: [
      {
        content: 'Answer no. 1',
        correct: false,
      },
      {
        content: 'Answer no. 2',
        correct: true,
      },
    ],
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionChoicesDto)
  answer: QuestionChoicesDto[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Number,
    required: false,
    default: 1,
    example: 1,
  })
  is_active?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: IsNumber,
    required: false,
    default: 1,
    example: 1,
  })
  status?: QUESTION_STATUS;
}
