import { Test, TestingModule } from '@nestjs/testing';
import { EventRewardController } from './event-reward.controller';
import { EventRewardService } from '../services/event-reward.service';

describe('EventRewardController', () => {
  let controller: EventRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventRewardController],
      providers: [EventRewardService],
    }).compile();

    controller = module.get<EventRewardController>(EventRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
