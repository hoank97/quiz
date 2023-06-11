import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { STATUS } from 'src/commons/constants/variables.constants';

export class UpdateSubjectDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Name of subject',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Description of subject',
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    description: 'Is active subject',
    required: false,
    type: 'enum',
  })
  @Type(() => Number)
  @IsEnum(STATUS)
  @IsOptional()
  readonly is_active?: STATUS;

  @ApiProperty({
    description: 'Category Id',
    required: false,
    type: Number,
  })
  @Type(() => Number)
  @IsOptional()
  readonly category_id?: number;
}
