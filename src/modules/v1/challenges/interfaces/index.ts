import { STATUS } from 'src/commons/constants/variables.constants';
import { LEVEL, TYPE } from '../challenges.constants';

export interface IChallenge {
  id: number;
  subject_id?: number;
  name: string;
  type: TYPE;
  number_of_questions: number;
  passing_score: number;
  duration: number;
  max_retries: number;
  start_date: Date;
  end_date: Date;
  is_active: STATUS;
  is_public: boolean;
  security_level: LEVEL;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}
