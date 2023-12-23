import { z } from 'zod';

// const phoneRegex = new RegExp(
//   /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
// );

export const partnerSchema = z.object({
  id: z.string().nullish(),
  organizationType: z.string(),
  organizationName: z.string(),
  email: z.string().email({
    message: 'Please provide email',
  }),
  addressShort: z.string(),
  password: z.string().min(3, {
    message: 'Password must be at least 3 characters.',
  }),
  // phoneNumber1: z.string(),
  // phoneNumber2: z.string(),

  bio: z.string(),
  introduction: z.string(),
  contact: z.object({
    phoneNumber1: z.string(),
    phoneNumber2: z.string(),
    // phone_primary: z.string().regex(phoneRegex).length(8),
    // phone_secondary: z.string().regex(phoneRegex).length(8),
    // facebook: z.string().url().optional().or(z.literal('')),
    // twitter: z.string().url().optional().or(z.literal('')),
    // instagram: z.string().url().optional().or(z.literal('')),
  }),
  // phoneNumber: z.string().regex(phoneRegex).length(8),
});
