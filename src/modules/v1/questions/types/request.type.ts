import { Request } from 'express';
import { IUser } from '../../users/interfaces';
import { QUESTION_STATUS } from '../constants';
import { IQuestionChoicesResponse } from './question-choices.response';

export interface IRequestAuth extends Request {
  user: IUser;
}

export interface IQuestionListFilter {
  page: number;
  limit: number;
  type: number;
  term: string;
  status: QUESTION_STATUS;
  with_correct_answers: number;
}

export interface IQuestionSubmit {
  id: number;
  answer: IQuestionChoicesResponse;
}
