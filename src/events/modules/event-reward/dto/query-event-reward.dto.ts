import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { EventReward } from '../entities/event-reward.entity';
import { FilterEventDto, SortEventDto } from 'src/events/dto/query-event.dto';

export class SortEventRewardDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof EventReward;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryEventRewardDto {
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
