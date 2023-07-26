import { z } from 'zod';

export const categorySchema = z.object({
  mainCategory: z.string(),
  subCategory: z.string(),
});
