import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { Challenge } from '../../challenges/entities/challenge.entity';
import { STATUS } from '../../../../commons/constants/variables.constants';
import Categories from '../../categories/entities/categories.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category_id: number;

  @Column()
  description: string;

  @Column({
    default: true,
  })
  is_active: STATUS;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @CreateDateColumn()
  created_at: Date;

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

  @OneToMany(() => Challenge, (challenge) => challenge.subject)
  challenges: Challenge[];

  @ManyToMany(() => Question, (q) => q.subjects)
  @JoinTable({
    name: 'question_subject',
    joinColumn: {
      name: 'subject_id',
    },
    inverseJoinColumn: {
      name: 'question_id',
    },
  })
  questions: Question[];

  @ManyToOne(() => Categories, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'category_id',
  })
  category: Categories;
}
