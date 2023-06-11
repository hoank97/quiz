import { ISubject } from '../../subjects/interfaces';
import { IQuestionChoicesResponse } from './question-choices.response';
import { QUESTION_STATUS, QUESTION_TYPE } from '../constants';

export interface IQuestionDetail {
  content: string;
  type: QUESTION_TYPE;
  subjects: ISubject[];
  answer: IQuestionChoicesResponse[];
  status: QUESTION_STATUS;
  is_active: boolean;
}
