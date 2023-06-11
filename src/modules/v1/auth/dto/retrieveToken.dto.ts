import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RetrieveTokenDto {
  @ApiProperty({
    required: true,
    description: 'Refresh token',
    type: String,
  })
  @IsString()
  readonly refreshToken: string;
}
