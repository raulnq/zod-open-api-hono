import { z } from '@hono/zod-openapi';

const errorSchema = z.object({
  path: z.string().openapi({
    example: 'title',
    description: 'The path to the field that failed validation',
  }),
  message: z.string().openapi({
    example: 'Too small: expected string to have >=1 characters',
    description: 'The validation error message',
  }),
  code: z.string().openapi({
    example: 'too_small',
    description: 'The validation error code',
  }),
});

export const problemDocumentSchema = z
  .object({
    type: z.string().optional().openapi({
      example: '/problems/resource-not-found',
      description: 'A URI reference that identifies the problem type',
    }),
    title: z.string().openapi({
      example: 'Resource not found',
      description: 'A short, human-readable summary of the problem type',
    }),
    status: z.number().openapi({
      example: 404,
      description: 'The HTTP status code',
    }),
    detail: z.string().optional().openapi({
      example: 'The requested todo was not found',
      description: 'A human-readable explanation specific to this occurrence',
    }),
    instance: z.string().optional().openapi({
      example: '/todos/019af0ad-4ac8-7052-a609-24a539d353cd',
      description: 'A URI reference that identifies the specific occurrence',
    }),
    errors: z
      .array(errorSchema)
      .optional()
      .openapi({
        example: [
          {
            path: 'title',
            message: 'Too small: expected string to have >=1 characters',
            code: 'too_small',
          },
        ],
        description: 'Array of validation errors',
      }),
  })
  .openapi('ProblemDocument');
