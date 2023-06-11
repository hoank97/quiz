import { ExamQuestion } from '../../exam-questions/entities/exam-question.entity';
import { IQuestionChoicesResponse } from '../../questions/types/question-choices.response';
import { IQuestionResponse } from '../../questions/types/question-list.response';
import { EXAM_STATUS } from '../constants';

export interface IExamResult {
  id: number;
  user_id: number;
  challenge_id: number;
  spend_time?: number;
  score?: number;
  status: EXAM_STATUS;
  created_at: Date;
  updated_at: Date;
}

export interface IExam {
  id: number;
  questions: IQuestionResponse[];
  duration: number;
}

export interface IExamSubmit {
  id: number;
  spendTime: number;
  score: number;
  status: EXAM_STATUS;
}

export interface IHistoryExam {
  score: number;
  spendTime: number;
  status: EXAM_STATUS;
  passingScore: number;
  numberOfQuestions: number;
  duration: number;
  questions: ExamQuestion[];
}
