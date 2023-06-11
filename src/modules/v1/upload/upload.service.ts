import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import * as cloudinary from 'cloudinary';
import * as fs from 'fs-extra';
import { IResponse } from '../../../commons/interfaces/index';

@Injectable()
export class UploadService {
  async create(file: Express.Multer.File): Promise<IResponse<string>> {
    const time = new Date().getTime().toString();
    const res = cloudinary.v2.uploader.upload(file.path, {
      public_id: time,
    });
    res.catch((err) => {
      return err;
    });
    fs.unlinkSync(file.path);

    return {
      statusCode: HttpStatus.OK,
      data: 'Successful',
    };
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
