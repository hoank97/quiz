import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class TakeExamDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Challenge Id',
  })
  @Type(() => Number)
  @IsNumber()
  readonly challengeId: number;
}
