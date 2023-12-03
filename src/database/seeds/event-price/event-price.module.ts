import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPrice } from 'src/events/modules/event-price/entities/event-price.entity';
import { EventPriceSeedService } from './event-price.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventPrice])],
  providers: [EventPriceSeedService],
})
export class EventPriceSeedModule {}
