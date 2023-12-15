import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  SerializeOptions,
  Put,
  // UseGuards,
} from '@nestjs/common';

import { InfinityPaginationResultType } from '@/types/infinity-pagination-result.type';
import { infinityPagination } from '@utils/infinity-pagination';
import { EventRewardService } from '../services/event-reward.service';
import { CreateEventRewardDto } from '../dto/create-event-reward.dto';
import { QueryEventRewardDto } from '../dto/query-event-reward.dto';
import { EventReward } from '../entities/event-reward.entity';
import { UpdateEventRewardDto } from '../dto/update-event-reward.dto';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Roles } from 'src/roles/roles.decorator';
// import { RoleEnum } from 'src/roles/roles.enum';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from 'src/roles/roles.guard';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
// @ApiTags('EventReward')
@Controller({
  path: 'event-reward',
  version: '1',
})
@Controller('event-reward')
export class EventRewardController {
  constructor(private readonly eventRewardService: EventRewardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEventDto: CreateEventRewardDto) {
    console.log(createEventDto);
    return this.eventRewardService.create(createEventDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async f(
    @Query() query: QueryEventRewardDto,
  ): Promise<InfinityPaginationResultType<EventReward>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.eventRewardService.findManyWithPagination({
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventRewardService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventRewardDto,
  ) {
    console.log(updateEventDto);

    return this.eventRewardService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventRewardService.softDelete(+id);
  }
}
