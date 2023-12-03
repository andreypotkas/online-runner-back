import { Module } from '@nestjs/common';
import { EventCategory } from './entities/event-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory])],
})
export class EventCategoryModule {}
