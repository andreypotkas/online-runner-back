import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategory } from '../event-category/entities/event-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory])],
})
export class EventPriceModule {}
