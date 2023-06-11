import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryProvider } from './upload.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './src/upload',
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [CloudinaryProvider, UploadService],
})
export class UploadModule {}
