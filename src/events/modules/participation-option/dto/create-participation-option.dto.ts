import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EventReward } from '../../event-reward/entities/event-reward.entity';

export class CreateParticipationOptionDto {
  @ApiProperty({ example: 'Winter is coming!' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: () => EventReward, example: {} })
  @IsNotEmpty()
  reward: EventReward;
}
