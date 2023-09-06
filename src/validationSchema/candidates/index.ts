import * as yup from 'yup';

export const candidateValidationSchema = yup.object().shape({
  name: yup.string().required(),
  skills: yup.string().required(),
  experience: yup.string().required(),
  job_id: yup.string().nullable().required(),
});
