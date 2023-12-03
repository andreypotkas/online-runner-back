import { EntityHelper } from '@utils/entity-helper';
import { FileEntity } from 'src/files/entities/file.entity';
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

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  image: FileEntity | null;

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

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
