import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from '@utils/entity-helper';
import { EventReward } from '../../event-reward/entities/event-reward.entity';

@Entity()
export class ParticipationOption extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String })
  name: string | null;

  @Index()
  @Column({ type: Number })
  price: number | null;

  @ManyToOne(() => EventReward, {
    eager: true,
  })
  reward: EventReward;
}
