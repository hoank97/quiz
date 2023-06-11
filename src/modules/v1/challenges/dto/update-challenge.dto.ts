import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChallengeDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Name of subject',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    description: 'Number of question in a subject',
    required: false,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  readonly number_of_questions?: number;

  @ApiProperty({
    description: 'Passing score',
    required: false,
    type: Number,
  })
  @IsOptional()
  readonly passing_score?: number;

  @ApiProperty({
    description: 'Maximum number of retries',
    required: false,
    type: Number,
  })
  @IsOptional()
  readonly max_retries?: number;

  @ApiProperty({
    description: 'Time to do exam',
    required: false,
    type: Number,
  })
  @IsOptional()
  readonly duration?: number;
}
