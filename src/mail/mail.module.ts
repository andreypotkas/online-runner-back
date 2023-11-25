import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './services/mail.service';
import { MailerService } from './services/mailer.service';

@Module({
  imports: [ConfigModule],
  providers: [MailService, MailerService],
  exports: [MailService],
})
export class MailModule {}
