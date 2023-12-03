import { Module } from '@nestjs/common';
import { EventCategorySeedService } from './event-category.service';
import { EventCategory } from 'src/events/modules/event-category/entities/event-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory])],
  providers: [EventCategorySeedService],
})
export class EventCategorySeedModule {}
