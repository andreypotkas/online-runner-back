import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '@utils/entity-helper';

@Entity()
export class ParticipationOption extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, nullable: true })
  name: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  price: string | null;
}
