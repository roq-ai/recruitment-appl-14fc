import { CandidateInterface } from 'interfaces/candidate';
import { GetQueryInterface } from 'interfaces';

export interface InterviewInterface {
  id?: string;
  date_time: any;
  location: string;
  notes?: string;
  candidate_id: string;
  created_at?: any;
  updated_at?: any;

  candidate?: CandidateInterface;
  _count?: {};
}

export interface InterviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  notes?: string;
  candidate_id?: string;
}
