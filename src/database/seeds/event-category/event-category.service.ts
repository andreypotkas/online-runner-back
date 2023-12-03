import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from 'src/events/modules/event-category/entities/event-category.entity';
import { EventCategoriesEnum } from 'src/events/modules/event-category/enums/event-categories.enum';
import { Repository } from 'typeorm';

@Injectable()
export class EventCategorySeedService {
  constructor(
    @InjectRepository(EventCategory)
    private repository: Repository<EventCategory>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: EventCategoriesEnum.Running,
          name: 'Бег',
        }),
        this.repository.create({
          id: EventCategoriesEnum.Cycling,
          name: 'Велоезда',
        }),
        this.repository.create({
          id: EventCategoriesEnum.Swimming,
          name: 'Плавание',
        }),
        this.repository.create({
          id: EventCategoriesEnum.Skiing,
          name: 'Лыжи',
        }),
      ]);
    }
  }
}
