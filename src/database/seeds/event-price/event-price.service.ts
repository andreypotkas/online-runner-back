import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventPrice } from 'src/events/modules/event-price/entities/event-price.entity';
import { EventPricesEnum } from 'src/events/modules/event-price/enums/event-prices.enum';
import { Repository } from 'typeorm';

@Injectable()
export class EventPriceSeedService {
  constructor(
    @InjectRepository(EventPrice)
    private repository: Repository<EventPrice>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: EventPricesEnum.free,
          price: 0,
        }),
        this.repository.create({
          id: EventPricesEnum.basic,
          price: 5,
        }),
        this.repository.create({
          id: EventPricesEnum.medium,
          price: 10,
        }),
        this.repository.create({
          id: EventPricesEnum.advanced,
          price: 20,
        }),
      ]);
    }
  }
}
