import { EntityHelper } from '@utils/entity-helper';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParticipationOption } from '../modules/participation-option/entities/participation-option.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { EventCategory } from '../modules/event-category/entities/event-category.entity';
import { EventReward } from '../modules/event-reward/entities/event-reward.entity';

@Entity()
export class Event extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, nullable: true })
  name: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  description: string | null;

  @Column({ type: String, nullable: true })
  image: string;

  @ManyToOne(() => EventCategory)
  category: EventCategory;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @ManyToMany(() => ParticipationOption)
  @JoinTable()
  participationOptions: ParticipationOption[];

  @ManyToMany(() => EventReward)
  @JoinTable()
  rewards: EventReward[];

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status;

  @Column({ type: String })
  startDate: string;

  @Column({ type: String })
  endDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
