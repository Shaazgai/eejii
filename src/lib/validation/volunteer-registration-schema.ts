import * as z from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const volunteerSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Fist name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email(),
  primary_phone: z.string().regex(phoneRegex).length(8),
  secondary_phone: z.string().regex(phoneRegex).length(8).nullable(),
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
