import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from '../../exams/entities/exam.entity';
import { Question } from '../../questions/entities/question.entity';
import { IQuestionChoicesResponse } from '../../questions/types/question-choices.response';
import { QUESTION_STATUS } from '../constants';

@Entity('exam_question')
export class ExamQuestion {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly exam_id: number;

  @Column()
  readonly question_id: number;

  @Column({
    type: 'json',
    nullable: true,
  })
  readonly user_answered?: IQuestionChoicesResponse;

  @Column({
    nullable: true,
  })
  readonly status?: QUESTION_STATUS;

  @Column({
    nullable: false,
  })
  readonly content: string;

  @Column({
    type: 'json',
    nullable: false,
  })
  readonly answers: IQuestionChoicesResponse[];

  @ManyToOne(() => Exam, (exam) => exam.id)
  @JoinColumn({
    name: 'exam_id',
    referencedColumnName: 'id',
  })
  exam: Exam;

  @ManyToOne(() => Question, (question) => question.id)
  @JoinColumn({
    name: 'question_id',
    referencedColumnName: 'id',
  })
  question: Question;
}
