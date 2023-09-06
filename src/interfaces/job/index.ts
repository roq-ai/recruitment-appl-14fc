import { CandidateInterface } from 'interfaces/candidate';
import { EmployerInterface } from 'interfaces/employer';
import { GetQueryInterface } from 'interfaces';

export interface JobInterface {
  id?: string;
  title: string;
  description: string;
  requirements: string;
  employer_id: string;
  created_at?: any;
  updated_at?: any;
  candidate?: CandidateInterface[];
  employer?: EmployerInterface;
  _count?: {
    candidate?: number;
  };
}

export interface JobGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  requirements?: string;
  employer_id?: string;
}
