import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { IsOptional, Validate } from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsExist } from '@utils/validators/is-exists.validator';
import { ParticipationOption } from '../modules/participation-option/entities/participation-option.entity';
import { User } from 'src/users/entities/user.entity';
import { FileEntity } from 'src/files/entities/file.entity';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty({ example: 'Winter is coming!' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Winter is coming! Detailed description of event.' })
  @IsOptional()
  description?: string;

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
  @IsOptional()
  image?: FileEntity | null;

  @ApiProperty({ type: () => User, example: [] })
  @IsOptional()
  participants?: User[];

  @ApiProperty({ type: () => ParticipationOption, example: [] })
  @IsOptional()
  participationOptions?: ParticipationOption[];

  @ApiProperty({
    example: '1701614504',
    description: 'The start date of the event.',
  })
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    example: '1701634504',
    description: 'The end date of the event.',
  })
  @IsOptional()
  endDate?: string;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  @IsOptional()
  status?: Status;
}
