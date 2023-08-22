import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const partnerSchema = z.object({
  organization: z.string().min(2, {
    message: 'Fist name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please provide email',
  }),
  bio: z.string(),
  contact: z.object({
    phone_primary: z.string().regex(phoneRegex).length(8),
    phone_secondary: z.string().regex(phoneRegex).length(8),
    facebook: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
  }),
  phoneNumber: z.string().regex(phoneRegex).length(8),
});

export const supporterSchema = partnerSchema;
