import { ApiProperty } from '@nestjs/swagger';

export class QuestionSubjectDto {
  @ApiProperty({
    example: 'Backend',
  })
  name: string;

  @ApiProperty({
    example: 'This subject contains questions about backend programming',
  })
  description: string;
}
