import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { ShopConfig } from './shop-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  SHOP_TELEGRAM_BOT_TOKEN: string;

  @IsOptional()
  @IsString()
  SHOP_TELEGRAM_CHAT_ID: string;

  @IsOptional()
  @IsString()
  SHOP_TELEGRAM_CHAT_ID_SECONDARY: string;
}

export default registerAs<ShopConfig>('shop', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    chatId: process.env.SHOP_TELEGRAM_CHAT_ID,
    chatIdSecondary: process.env.SHOP_TELEGRAM_CHAT_ID_SECONDARY,
    botToken: process.env.SHOP_TELEGRAM_BOT_TOKEN,
  };
});
