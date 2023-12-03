import { Module } from '@nestjs/common';
import { EventRewardSeedService } from './event-reward.service';
import { EventReward } from 'src/events/modules/event-reward/entities/event-reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventReward])],
  providers: [EventRewardSeedService],
})
export class EventRewardSeedModule {}
