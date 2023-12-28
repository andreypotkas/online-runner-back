import { Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { FilterEventDto, SortEventDto } from '../dto/query-event.dto';
import { IPaginationOptions } from '@/types/pagination-options';
import { ParticipationOptionService } from '../modules/participation-option/services/participationOption.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private participationOptionsService: ParticipationOptionService,
  ) {}
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const participationOptions = createEventDto.participationOptions;

    const createdParticipationOptions = await Promise.all(
      participationOptions.map((item) => {
        return this.participationOptionsService.create(item);
      }),
    );

    return this.eventsRepository
      .save(
        this.eventsRepository.create({
          ...createEventDto,
          participationOptions: createdParticipationOptions,
        }),
      )
      .then((data) => this.findOne(data.id));
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterEventDto | null;
    sortOptions?: SortEventDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Event[]> {
    const where: FindOptionsWhere<Event> = {};
    if (filterOptions?.categories?.length) {
      where.category = filterOptions.categories.map((category) => ({
        id: category.id,
      }));
    }

    return this.eventsRepository.find({
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
      relations: {
        participants: true,
        participationOptions: true,
        category: true,
      },
    });
  }

  findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOne({
      where: { id },
      relations: {
        participants: true,
        participationOptions: true,
        category: true,
      },
    });
  }

  async update(id: Event['id'], payload: DeepPartial<Event>): Promise<Event> {
    await this.eventsRepository.save(
      this.eventsRepository.create({
        id,
        ...payload,
      }),
    );
    return await this.findOne(id);
  }

  async remove(id: Event['id']): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
