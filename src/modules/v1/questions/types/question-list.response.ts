import { IQuestionChoicesResponse } from './question-choices.response';
import { Subject } from '../../subjects/entities/subject.entity';
import { QUESTION_STATUS } from '../constants';

export interface IQuestionResponse {
  id: number;

  content: string;

  type: number;

  subjects: Subject[];

  answer: IQuestionChoicesResponse[];

  status: QUESTION_STATUS;

  created_by: number;

  updated_by: number;
}
