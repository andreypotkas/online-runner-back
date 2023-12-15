import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipationOption } from 'src/events/modules/participation-option/entities/participation-option.entity';
import { ParticipationOptionsEnum } from 'src/events/modules/participation-option/enums/participation-option.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipationOptionSeedService {
  constructor(
    @InjectRepository(ParticipationOption)
    private repository: Repository<ParticipationOption>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: ParticipationOptionsEnum.free,
          name: 'Бесплатный',
          price: '5',
        }),
        this.repository.create({
          id: ParticipationOptionsEnum.basic,
          name: 'Базовый',
          price: '10',
        }),
        this.repository.create({
          id: ParticipationOptionsEnum.medium,
          name: 'Средний',
          price: '15',
        }),
        this.repository.create({
          id: ParticipationOptionsEnum.advanced,
          name: 'Продвинутый',
          price: '20',
        }),
      ]);
    }
  }
}
