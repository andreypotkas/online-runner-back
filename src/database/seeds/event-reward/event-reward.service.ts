import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventReward } from 'src/events/modules/event-reward/entities/event-reward.entity';
import { EventRewardsEnum } from 'src/events/modules/event-reward/enums/event-rewards.enum';
import { Repository } from 'typeorm';

@Injectable()
export class EventRewardSeedService {
  constructor(
    @InjectRepository(EventReward)
    private repository: Repository<EventReward>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: EventRewardsEnum.Achievement,
          name: 'Достижение',
        }),
        this.repository.create({
          id: EventRewardsEnum.Diploma,
          name: 'Диплом',
        }),
        this.repository.create({
          id: EventRewardsEnum.Medal,
          name: 'Медаль',
        }),
        this.repository.create({
          id: EventRewardsEnum['T-shirt'],
          name: 'Майка',
        }),
      ]);
    }
  }
}
