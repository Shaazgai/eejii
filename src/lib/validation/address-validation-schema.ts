import { z } from 'zod';

export const addressFormSchema = z.object({
  country: z.string().min(2, {
    message: 'Country must have at least 2 characters.',
  }),
  city: z
    .string({
      required_error: 'Please select City',
    })
    .min(2, {
      message: 'Country must have at least 2 characters.',
    }),
  provinceName: z
    .string({
      required_error: 'Please select Province',
    })
    .min(2, {
      message: 'Country must have at least 2 characters.',
    }),
  street: z
    .string({
      required_error: 'Please select Street',
    })
    .min(2, {
      message: 'Country must have at least 2 characters.',
    }),
});
