import { STATUS } from 'src/commons/constants/variables.constants';
import { IChallenge } from '../../challenges/interfaces';

export interface ISubject {
  id: number;
  challenges?: IChallenge[];
  name: string;
  description: string;
  is_active: STATUS;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  category_id: number;
}
