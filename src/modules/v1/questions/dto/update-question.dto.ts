import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { QUESTION_STATUS } from '../constants';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsOptional()
  @IsEnum(QUESTION_STATUS)
  status?: QUESTION_STATUS;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
