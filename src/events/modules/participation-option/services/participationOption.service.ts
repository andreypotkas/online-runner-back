import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ParticipationOption } from '../entities/participation-option.entity';
import { CreateParticipationOptionDto } from '../dto/create-participation-option.dto';

@Injectable()
export class ParticipationOptionService {
  constructor(
    @InjectRepository(ParticipationOption)
    private participationOptionRepository: Repository<ParticipationOption>,
  ) {}
  create(
    createParticipationOptionDto: CreateParticipationOptionDto,
  ): Promise<ParticipationOption> {
    return this.participationOptionRepository.save(
      this.participationOptionRepository.create(createParticipationOptionDto),
    );
  }
}
