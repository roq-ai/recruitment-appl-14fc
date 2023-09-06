import axios from 'axios';
import queryString from 'query-string';
import { InterviewInterface, InterviewGetQueryInterface } from 'interfaces/interview';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInterviews = async (
  query?: InterviewGetQueryInterface,
): Promise<PaginatedInterface<InterviewInterface>> => {
  const response = await axios.get('/api/interviews', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createInterview = async (interview: InterviewInterface) => {
  const response = await axios.post('/api/interviews', interview);
  return response.data;
};

export const updateInterviewById = async (id: string, interview: InterviewInterface) => {
  const response = await axios.put(`/api/interviews/${id}`, interview);
  return response.data;
};

export const getInterviewById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/interviews/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInterviewById = async (id: string) => {
  const response = await axios.delete(`/api/interviews/${id}`);
  return response.data;
};
