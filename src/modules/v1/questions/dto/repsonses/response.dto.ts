import { IPagination, IResponse } from '../../../../../commons/interfaces';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class PaginationDto implements IPagination {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  currentPages: number;

  @ApiProperty({
    example: 20,
  })
  perPage: number;

  @ApiProperty({
    example: 250,
  })
  total: number;
}

export class ResponseDto<T> implements IResponse<T> {
  @ApiProperty()
  statusCode: number;

  data: T;

  @ApiProperty({
    type: PaginationDto,
  })
  pagination?: PaginationDto;
}

export class SingleRecordResponseDto extends OmitType(ResponseDto, [
  'pagination',
]) {}
