import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEventRewardDto {
  @ApiProperty({ example: 'Winter is coming!' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Winter is coming! Detailed description of event.' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'Winter is coming! Detailed description of event.' })
  @IsNotEmpty()
  image: string;
}
