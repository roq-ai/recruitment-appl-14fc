import { InterviewInterface } from 'interfaces/interview';
import { JobInterface } from 'interfaces/job';
import { GetQueryInterface } from 'interfaces';

export interface CandidateInterface {
  id?: string;
  name: string;
  skills: string;
  experience: string;
  job_id: string;
  created_at?: any;
  updated_at?: any;
  interview?: InterviewInterface[];
  job?: JobInterface;
  _count?: {
    interview?: number;
  };
}

export interface CandidateGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  skills?: string;
  experience?: string;
  job_id?: string;
}
