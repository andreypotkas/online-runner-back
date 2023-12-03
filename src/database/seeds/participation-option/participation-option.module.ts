import { Module } from '@nestjs/common';
import { ParticipationOptionSeedService } from './participation-option.service';
import { ParticipationOption } from 'src/events/modules/participation-option/entities/participation-option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipationOption])],
  providers: [ParticipationOptionSeedService],
})
export class ParticipationOptionSeedModule {}
