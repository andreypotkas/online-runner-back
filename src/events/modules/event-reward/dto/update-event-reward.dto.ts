import { PartialType } from '@nestjs/swagger';
import { CreateEventRewardDto } from './create-event-reward.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateEventRewardDto extends PartialType(CreateEventRewardDto) {
  @ApiProperty({ example: 'Winter is coming!' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Winter is coming! Detailed description of event.' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 10 })
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 'Winter is coming!' })
  @IsOptional()
  image?: string;
}
