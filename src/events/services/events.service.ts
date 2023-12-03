import { Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { FilterEventDto, SortEventDto } from '../dto/query-event.dto';
import { IPaginationOptions } from '@/types/pagination-options';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}
  create(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsRepository.save(
      this.eventsRepository.create(createEventDto),
    );
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
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    console.log(updateEventDto);

    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
