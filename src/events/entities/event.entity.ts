import { EntityHelper } from '@utils/entity-helper';
import { FileEntity } from 'src/files/entities/file.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParticipationOption } from '../modules/participation-option/entities/participation-option.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { EventCategory } from '../modules/event-category/entities/event-category.entity';

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

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  image: FileEntity | null;

  @ManyToOne(() => EventCategory)
  category: EventCategory;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @ManyToMany(() => ParticipationOption)
  @JoinTable()
  participationOptions: ParticipationOption[];

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
