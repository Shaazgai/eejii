import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const roleSchema = z.string();

export const eventSchema = z.object({
  id: z.string().nullish(),
  title: z.string().min(2, {
    message: 'Country must have at least 2 characters.',
  }),
  description: z
    .string({
      required_error: 'Please provide description',
    })
    .min(2, {
      message: 'Country must have at least 2 characters.',
    }),
  location: z
    .string({
      required_error: 'Please provide location info',
    })
    .min(2, {
      message: 'Country must have at least 2 characters.',
    }),
  startTime: z.date(),
  endTime: z.date(),
  requiredTime: z.string(),
  roles: z.array(z.string()).nullish(),
  mainCategory: z.string(),
  contact: z.object({
    phone_primary: z.string().regex(phoneRegex).length(8),
    phone_secondary: z.string().regex(phoneRegex).length(8),
  }),
});
