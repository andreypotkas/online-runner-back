import { Module } from '@nestjs/common';
import { EventRewardService } from './services/event-reward.service';
import { EventRewardController } from './controllers/event-reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventReward } from './entities/event-reward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventReward])],
  controllers: [EventRewardController],
  providers: [EventRewardService],
})
export class EventRewardModule {}
