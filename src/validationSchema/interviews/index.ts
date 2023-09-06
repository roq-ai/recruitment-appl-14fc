import * as yup from 'yup';

export const interviewValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  location: yup.string().required(),
  notes: yup.string().nullable(),
  candidate_id: yup.string().nullable().required(),
});
