import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { EventCategoryModule } from './modules/event-category/event-category.module';
import { ParticipationOptionModule } from './modules/participation-option/participation-option.module';
import { EventRewardModule } from './modules/event-reward/event-reward.module';
import { EventPriceModule } from './modules/event-price/event-price.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    EventCategoryModule,
    ParticipationOptionModule,
    EventRewardModule,
    EventPriceModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
