import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    description: 'Access token',
    type: String,
  })
  @IsString()
  readonly accessToken: string;
}
