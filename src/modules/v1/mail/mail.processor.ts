import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';

@Processor('sendMail')
export class MailProcessor {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  @Process('sendMail')
  logST(job: Job<unknown>) {
    try {
      Logger.log(job.data);
      this.transporter.sendMail(job.data);
    } catch (err) {
      Logger.error(err);
    }
  }
}
