import { IQuestionChoicesResponse } from '../../types/question-choices.response';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionChoicesResponseDto implements IQuestionChoicesResponse {
  @ApiProperty({
    example: '123kg',
  })
  content: string;

  @ApiProperty({
    example: true,
  })
  correct: boolean;
}
