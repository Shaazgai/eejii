import * as z from 'zod';

export const volunteerFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Fist name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  birthday: z.date({
    required_error: 'A birth data is required',
  }),
  gender: z.string({
    required_error: 'Please select gender',
  }),
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
});
