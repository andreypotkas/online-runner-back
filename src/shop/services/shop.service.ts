import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { AllConfigType } from 'src/config/config.type';

export type Product = {
  name: string;
  price: string;
  count: string;
  size: string;
};

export type OrderBody = {
  products: Product[];
  contactType: string;
  contact: string;
};

export type QuestionBody = {
  questionMessage: string;
  contactType: string;
  contact: string;
};

@Injectable()
export class ShopService {
  private readonly bot: TelegramBot;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    const token = this.configService.getOrThrow('shop.botToken', {
      infer: true,
    });

    this.bot = new TelegramBot(token, {
      polling: true,
    });
  }

  public checkout(orderBody: OrderBody) {
    const { products, contactType, contact } = orderBody;
    const productCards = products.map((product: Product) =>
      this.createProductCard(product),
    );

    const message = `
    ⭐<b style="color: #333;">RunConnect Shop Новый заказ!</b>⭐
      Дата: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

      ${productCards.join('\n')}
      Способ связи: ${contactType}
      Контакт: ${contact}
    `;

    this.bot.sendMessage(
      this.configService.getOrThrow('shop.chatId', {
        infer: true,
      }),
      message,
      { parse_mode: 'HTML' },
    );

    this.bot.sendMessage(
      this.configService.getOrThrow('shop.chatIdSecondary', {
        infer: true,
      }),
      message,
      { parse_mode: 'HTML' },
    );

    return { success: true };
  }

  public askQuestion(questionBody: QuestionBody) {
    const { questionMessage, contactType, contact } = questionBody;

    const message = `
    ❓❓❓<b style="color: #333;">RunConnect Shop Вопрос!</b>❓❓❓
      Дата : ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

      💬 ${questionMessage}

      Способ связи: ${contactType}
      Контакты: ${contact}
    `;

    this.bot.sendMessage(
      this.configService.getOrThrow('shop.chatId', {
        infer: true,
      }),
      message,
      { parse_mode: 'HTML' },
    );

    this.bot.sendMessage(
      this.configService.getOrThrow('shop.chatIdSecondary', {
        infer: true,
      }),
      message,
      { parse_mode: 'HTML' },
    );

    return { success: true };
  }

  private createProductCard(product: Product) {
    return `
        <b style="color: #333;">✅ ${product.name}</b>
        <i style="color: #777;">Цена:</i> ${product.price} руб.
        <i style="color: #777;">Количество:</i> ${product.count} шт.
        <i style="color: #777;">Размер:</i> ${product.size}.
    `;
  }
}
