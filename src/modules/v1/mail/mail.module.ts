import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './mail.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'sendMail' })],
  controllers: [MailController],
  providers: [MailService, MailProcessor],
})
export class MailModule {}
