import { z } from 'zod';

export const createSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
});

export const updateSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
});
