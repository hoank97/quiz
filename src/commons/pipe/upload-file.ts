import { ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { FILE_SIZE, FILE_TYPE } from 'src/commons/constants/variables.constants';

@Injectable()
export class FileValidatorPipe {
  transform(value: any, metadata: ArgumentMetadata) {
    const checkSize = this.validateSize(value.size);
    const checkType = this.validateType(value.mimetype);
    if (checkSize && checkType) {
      return value;
    }
    throw new BadRequestException('Not correct image');
  }

  validateSize(value: number) {
    return value < FILE_SIZE;
  }

  validateType(type: string) {
    return type.match(FILE_TYPE);
  }
}
