import axios from 'axios';
import queryString from 'query-string';
import { EmployerInterface, EmployerGetQueryInterface } from 'interfaces/employer';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getEmployers = async (
  query?: EmployerGetQueryInterface,
): Promise<PaginatedInterface<EmployerInterface>> => {
  const response = await axios.get('/api/employers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createEmployer = async (employer: EmployerInterface) => {
  const response = await axios.post('/api/employers', employer);
  return response.data;
};

export const updateEmployerById = async (id: string, employer: EmployerInterface) => {
  const response = await axios.put(`/api/employers/${id}`, employer);
  return response.data;
};

export const getEmployerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/employers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEmployerById = async (id: string) => {
  const response = await axios.delete(`/api/employers/${id}`);
  return response.data;
};
