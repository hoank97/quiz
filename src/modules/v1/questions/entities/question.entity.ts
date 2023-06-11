import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { QUESTION_STATUS } from '../constants';
import { IQuestionChoicesResponse } from '../types/question-choices.response';

@Entity({
  name: 'questions',
})
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'tinyint',
  })
  type: number;

  @Column({
    type: 'json',
  })
  answer: IQuestionChoicesResponse[];

  @Column({
    type: 'tinyint',
    default: QUESTION_STATUS.VERIFIED,
  })
  status: QUESTION_STATUS;

  @Column({
    nullable: true,
  })
  created_by: number;

  @Column({
    nullable: true,
  })
  updated_by: number;

  @Column({
    type: 'boolean',
  })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

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

  @ManyToMany(() => Subject, (s) => s.questions)
  subjects: Subject[];
}
