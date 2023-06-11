import { ApiProperty } from '@nestjs/swagger';

export class CreateMailDto {
  @ApiProperty()
  receiver: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  text: string;
}
