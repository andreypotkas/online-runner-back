import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderBody, ShopService } from '../services/shop.service';

@Controller({
  path: 'shop',
  version: '1',
})
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('')
  hello() {
    return 'Hello';
  }

  @Post('send-message')
  sendMessage(@Body() orderBody: OrderBody) {
    return this.shopService.sendMessage(orderBody);
  }
}
