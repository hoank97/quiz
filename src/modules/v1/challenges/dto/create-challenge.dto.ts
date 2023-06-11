import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { LEVEL, TYPE } from '../challenges.constants';
import { Type } from 'class-transformer';
import { STATUS } from 'src/commons/constants/variables.constants';

export class CreateChallengeDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Subject Id',
  })
  @IsString()
  readonly subject_id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Name of challenge',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Type of challenge',
    required: false,
    type: 'enum',
    default: TYPE.PRACTICE,
  })
  readonly type?: TYPE;

  @ApiProperty({
    description: 'Number of question in a challenge',
    required: true,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  readonly number_of_questions: number;

  @ApiProperty({
    description: 'Passing score',
    required: true,
    type: Number,
  })
  readonly passing_score: number;

  @ApiProperty({
    description: 'Time to do exam',
    required: true,
    type: Number,
  })
  readonly duration: number;

  @ApiProperty({
    description: 'Is active challenge',
    required: false,
    type: 'enum',
  })
  @Type(() => Number)
  @IsEnum(STATUS)
  @IsOptional()
  readonly is_active?: STATUS;

  @ApiProperty({
    description: 'Is public challenge',
    required: false,
    type: Boolean,
  })
  readonly is_public?: boolean;

  @ApiProperty({
    description: 'Maximum number of retries',
    required: true,
    type: Number,
  })
  readonly max_retries: number;

  @ApiProperty({
    description: 'Challenge start date',
    required: false,
    type: Date,
  })
  readonly start_date?: Date;

  @ApiProperty({
    description: 'Challenge end date',
    required: false,
    type: Date,
  })
  readonly end_date?: Date;

  @ApiProperty({
    description: 'Security level',
    required: false,
    type: 'enum',
    default: LEVEL.LOW,
  })
  readonly security_level?: LEVEL;
}
