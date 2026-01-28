import { z } from '@hono/zod-openapi';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

export const paginationParametersSchema = z.object({
  pageNumber: z.coerce.number().min(1).optional().default(DEFAULT_PAGE_NUMBER),
  pageSize: z.coerce
    .number()
    .min(1)
    .max(MAX_PAGE_SIZE)
    .optional()
    .default(DEFAULT_PAGE_SIZE),
});

export const createPageSchema = <T>(itemSchema: z.ZodSchema<T>) =>
  z.object({
    items: z.array(itemSchema),
    pageNumber: z.number().min(1),
    pageSize: z.number().min(1).max(MAX_PAGE_SIZE),
    totalPages: z.number().min(0),
    totalCount: z.number().min(0),
  });
