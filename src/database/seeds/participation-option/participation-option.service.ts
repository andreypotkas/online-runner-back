import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventPricesEnum } from 'src/events/modules/event-price/enums/event-prices.enum';
import { EventRewardsEnum } from 'src/events/modules/event-reward/enums/event-rewards.enum';
import { ParticipationOption } from 'src/events/modules/participation-option/entities/participation-option.entity';
import { ParticipationOptionsEnum } from 'src/events/modules/participation-option/enums/participation-option.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipationOptionSeedService {
  constructor(
    @InjectRepository(ParticipationOption)
    private repository: Repository<ParticipationOption>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: ParticipationOptionsEnum.free,
          name: 'Бесплатный',
          price: {
            id: EventPricesEnum.free,
            price: 0,
          },
          rewards: [
            {
              id: EventRewardsEnum.Achievement,
              name: 'Достижение',
            },
          ],
        }),
        this.repository.create({
          id: ParticipationOptionsEnum.basic,
          name: 'Базовый',
          price: {
            id: EventPricesEnum.basic,
            price: 5,
          },
          rewards: [
            {
              id: EventRewardsEnum.Achievement,
              name: 'Достижение',
            },
            {
              id: EventRewardsEnum.Diploma,
              name: 'Диплом',
            },
          ],
        }),
        this.repository.create({
          id: ParticipationOptionsEnum.medium,
          name: 'Средний',
          price: {
            id: EventPricesEnum.medium,
            price: 10,
          },
          rewards: [
            {
              id: EventRewardsEnum.Achievement,
              name: 'Достижение',
            },
            {
              id: EventRewardsEnum.Diploma,
              name: 'Диплом',
            },
            {
              id: EventRewardsEnum.Medal,
              name: 'Медаль',
            },
          ],
        }),
        this.repository.create({
          id: ParticipationOptionsEnum.advanced,
          name: 'Продвинутый',
          price: {
            id: EventPricesEnum.advanced,
            price: 20,
          },
          rewards: [
            {
              id: EventRewardsEnum.Achievement,
              name: 'Достижение',
            },
            {
              id: EventRewardsEnum.Diploma,
              name: 'Диплом',
            },
            {
              id: EventRewardsEnum.Medal,
              name: 'Медаль',
            },
            {
              id: EventRewardsEnum['T-shirt'],
              name: 'Майка',
            },
          ],
        }),
      ]);
    }
  }
}
