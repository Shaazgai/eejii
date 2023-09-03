import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const roleSchema = z.string();

export const fundraisingSchema = z.object({
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
  primary_phone: z.string().regex(phoneRegex).length(8).nullable(),
  secondary_phone: z.string().regex(phoneRegex).length(8).nullable(),
  goalAmount: z.number(),
  currentAmount: z.number(),
  email_1: z.string().email().nullable(),
  email_2: z.string().email().nullable(),
  mainCategory: z.string().nullish(),
});
