import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const roleSchema = z.string();

// if (typeof window === 'undefined') {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const undici = require('undici');
//   globalThis.File = undici.File;
// }

export const eventSchema = z.object({
  id: z.string().nullish().nullable(),
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
  roles: z.object({
    skills: z.string(),
    duties: z.string(),
    number: z.string(),
  }),
  contact: z.object({
    phone: z.string().regex(phoneRegex).length(8),
    email: z.string().email(),
  }),
  categories: z.array(z.string().nullable()),

  // image: z.string(),
});
