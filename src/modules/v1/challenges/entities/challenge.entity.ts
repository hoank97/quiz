import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';
import { TYPE } from '../challenges.constants';
import { UserEntity } from '../../users/entities/user.entity';
import { STATUS } from '../../../../commons/constants/variables.constants';
import { Exam } from '../../exams/entities/exam.entity';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly subject_id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly type: TYPE;

  @Column()
  readonly number_of_questions: number;

  @Column()
  readonly passing_score: number;

  @Column()
  readonly duration: number;

  @Column({
    default: true,
  })
  readonly is_active: STATUS;

  @Column({
    default: true,
  })
  readonly is_public: boolean;

  @Column()
  readonly max_retries: number;

  @Column()
  readonly start_date: Date;

  @Column()
  readonly end_date: Date;

  @Column()
  readonly security_level: number;

  @Column()
  readonly updated_by: number;

  @Column()
  readonly created_by: number;

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

  @ManyToOne(() => UserEntity, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'created_by',
  })
  owner: UserEntity;

  @ManyToOne(() => UserEntity, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'updated_by',
  })
  updater: UserEntity;

  @ManyToOne(() => Subject, (subject) => subject.id)
  @JoinColumn({
    name: 'subject_id',
    referencedColumnName: 'id',
  })
  subject: Subject;

  @OneToMany(() => Exam, (exam) => exam.challenge)
  exam: Exam[];
}
