import { registerAs } from '@nestjs/config';
import { MailConfig } from 'src/mail/config/mail-config.type';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  MAIL_USER: string;

  @IsString()
  @IsOptional()
  MAIL_PASSWORD: string;

  @IsEmail()
  MAIL_DEFAULT_EMAIL: string;

  @IsString()
  MAIL_DEFAULT_NAME: string;
}

export default registerAs<MailConfig>('mail', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    port: 587,
    host: 'smtp.gmail.com',
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    defaultEmail: process.env.MAIL_USER,
    defaultName: process.env.MAIL_DEFAULT_NAME,
    ignoreTLS: false,
    secure: false,
    requireTLS: false,
  };
});
