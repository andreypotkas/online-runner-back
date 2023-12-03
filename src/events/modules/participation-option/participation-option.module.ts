import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipationOption } from './entities/participation-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipationOption])],
})
export class ParticipationOptionModule {}
