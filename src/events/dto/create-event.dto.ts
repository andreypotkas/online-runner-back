import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { User } from 'src/users/entities/user.entity';
import { ParticipationOption } from '../modules/participation-option/entities/participation-option.entity';
import { EventCategory } from '../modules/event-category/entities/event-category.entity';

export class CreateEventDto {
  @ApiProperty({ example: 'Winter is coming!' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Winter is coming! Detailed description of event.' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: () => FileEntity,
    example: {
      path: 'https://run-connect-bucker.s3.eu-west-1.amazonaws.com/uploads/fa0b21e2ea346b1ab496c.png',
      id: '1c114a40-cb5c-4649-b67f-c7505c6e2015',
    },
  })
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  image: FileEntity | null;

  @ApiProperty({ type: () => User, example: [] })
  @IsNotEmpty()
  participants: User[];

  @ApiProperty({ type: () => ParticipationOption, example: [] })
  @IsNotEmpty()
  participationOptions: ParticipationOption[];

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
