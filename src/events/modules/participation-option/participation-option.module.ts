import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipationOption } from './entities/participation-option.entity';
import { ParticipationOptionService } from './services/participationOption.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipationOption])],
  providers: [ParticipationOptionService],
  exports: [ParticipationOptionService],
})
export class ParticipationOptionModule {}
