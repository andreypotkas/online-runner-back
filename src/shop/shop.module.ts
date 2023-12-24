import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShopController } from './controllers/shop.controller';
import { ShopService } from './services/shop.service';

@Module({
  imports: [ConfigModule],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
