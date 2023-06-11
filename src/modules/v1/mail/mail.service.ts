import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { IMail } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  constructor(@InjectQueue('sendMail') private mail: Queue) {}

  addJob(data: IMail) {
    this.mail.add('sendMail', data, {
      jobId: data.to + new Date().getTime().toString(),
      // delay: 10000,
    });
  }

  sendMail(param: CreateMailDto) {
    const data: IMail = {
      from: `"${process.env.APP_NAME}" <${process.env.MAIL_ID}>`,
      to: param.receiver,
      subject: param.subject,
      text: param.text,
    };

    this.addJob(data);
  }
}
