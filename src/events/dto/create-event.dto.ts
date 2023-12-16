import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { User } from 'src/users/entities/user.entity';
import { ParticipationOption } from '../modules/participation-option/entities/participation-option.entity';
import { EventCategory } from '../modules/event-category/entities/event-category.entity';
import { EventReward } from '../modules/event-reward/entities/event-reward.entity';

export class CreateEventDto {
  @ApiProperty({ example: 'Winter is coming!' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Winter is coming! Detailed description of event.' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Winter is coming!' })
  @IsNotEmpty()
  image: string;

  @ApiProperty({ type: () => User, example: [] })
  @IsNotEmpty()
  participants: User[];

  @ApiProperty({ type: () => ParticipationOption, example: [] })
  @IsNotEmpty()
  participationOptions: ParticipationOption[];

  @ApiProperty({ type: () => EventReward, example: [] })
  @IsNotEmpty()
  rewards: EventReward[];

  @ApiProperty({ type: () => EventCategory, example: 1 })
  @IsNotEmpty()
  category: EventCategory;

  @ApiProperty({
    example: '1701614504',
    description: 'The start date of the event.',
  })
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: '1701634504',
    description: 'The end date of the event.',
  })
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status: Status;
}
