import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { EventCategorySeedService } from './event-category/event-category.service';
import { EventPriceSeedService } from './event-price/event-price.service';
import { EventRewardSeedService } from './event-reward/event-reward.service';
import { ParticipationOptionSeedService } from './participation-option/participation-option.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(EventCategorySeedService).run();
  await app.get(EventPriceSeedService).run();
  await app.get(EventRewardSeedService).run();
  await app.get(ParticipationOptionSeedService).run();

  await app.close();
};

void runSeed();
