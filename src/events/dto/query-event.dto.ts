import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { EventCategory } from '../modules/event-category/entities/event-category.entity';
import { Event } from '../entities/event.entity';

export class FilterEventDto {
  @ApiProperty({ type: EventCategory })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Role)
  categories?: EventCategory[] | null;
}

export class SortEventDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Event;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryEventDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterEventDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterEventDto)
  filters?: FilterEventDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortEventDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortEventDto)
  sort?: SortEventDto[] | null;
}
