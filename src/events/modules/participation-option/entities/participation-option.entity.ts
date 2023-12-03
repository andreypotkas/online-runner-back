import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventPrice } from '../../event-price/entities/event-price.entity';
import { EventReward } from '../../event-reward/entities/event-reward.entity';
import { EntityHelper } from '@utils/entity-helper';

@Entity()
export class ParticipationOption extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, nullable: true })
  name: string | null;

  @ManyToOne(() => EventPrice, {
    eager: true,
  })
  price: EventPrice;

  @ManyToMany(() => EventReward)
  @JoinTable()
  rewards: EventReward[];
}
