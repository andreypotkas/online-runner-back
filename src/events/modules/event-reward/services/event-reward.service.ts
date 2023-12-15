import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { IPaginationOptions } from '@/types/pagination-options';
import { CreateEventRewardDto } from '../dto/create-event-reward.dto';
import { EventReward } from '../entities/event-reward.entity';
import { SortEventDto } from 'src/events/dto/query-event.dto';

@Injectable()
export class EventRewardService {
  constructor(
    @InjectRepository(EventReward)
    private eventRewardRepository: Repository<EventReward>,
  ) {}
  create(createEventRewardDto: CreateEventRewardDto): Promise<EventReward> {
    return this.eventRewardRepository.save(
      this.eventRewardRepository.create(createEventRewardDto),
    );
  }

  findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortEventDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<EventReward[]> {
    const where: FindOptionsWhere<EventReward> = {};

    return this.eventRewardRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
      relations: {},
    });
  }

  findOne(id: number): Promise<EventReward> {
    return this.eventRewardRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: EventReward['id'],
    payload: DeepPartial<EventReward>,
  ): Promise<EventReward> {
    await this.eventRewardRepository.save(
      this.eventRewardRepository.create({
        id,
        ...payload,
      }),
    );
    return await this.eventRewardRepository.findOneOrFail({ where: { id } });
  }

  async softDelete(id: EventReward['id']): Promise<void> {
    await this.eventRewardRepository.delete(id);
  }
}
