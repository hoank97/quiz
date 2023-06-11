import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Challenge } from '../../challenges/entities/challenge.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { EXAM_STATUS } from '../constants';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly user_id: number;

  @Column()
  readonly challenge_id: number;

  @Column()
  readonly spend_time: number;

  @Column()
  readonly score: number;

  @Column()
  readonly status: EXAM_STATUS;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @CreateDateColumn()
  readonly created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @UpdateDateColumn()
  readonly updated_at!: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(() => Challenge, (challenge) => challenge.id)
  @JoinColumn({
    name: 'challenge_id',
    referencedColumnName: 'id',
  })
  challenge: Challenge;
}
