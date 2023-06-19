import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/User';
import { IMailService } from './interfaces/IMailService';

@Injectable()
export class MailService implements IMailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPasswordLink(user: User, url: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset password',
      template: './reset_password',
      context: {
        name: user.firstName,
        surname: user.lastName,
        url: url,
      },
    });
  }

  async sendCompleteRegistrationLink(user: User, url: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Complete registration',
      template: './complete_registration',
      context: {
        name: user.firstName,
        surname: user.lastName,
        url: url,
      },
    });
  }
}
