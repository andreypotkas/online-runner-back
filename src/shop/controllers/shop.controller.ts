import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderBody, QuestionBody, ShopService } from '../services/shop.service';

@Controller({
  path: 'shop',
  version: '1',
})
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('shop-test')
  hello() {
    return 'Hello';
  }

  @Post('send-message')
  checkout(@Body() orderBody: OrderBody) {
    return this.shopService.checkout(orderBody);
  }

  @Post('ask-question')
  askQuestion(@Body() questionBody: QuestionBody) {
    return this.shopService.askQuestion(questionBody);
  }
}
