import type { Hook } from '@hono/zod-openapi';
import { BAD_REQUEST } from '@/http-status-codes.js';
import { ProblemDocument } from 'http-problem-details';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      new ProblemDocument(
        {
          type: '/problems/validation-error',
          title: 'Validation Error',
          status: BAD_REQUEST,
          detail: 'The request contains invalid data',
          instance: c.req.path,
        },
        {
          errors: result.error.issues.map(err => ({
            path: err.path.join('.'),
            message: err.message,
            code: err.code,
          })),
        }
      ),
      BAD_REQUEST
    );
  }
};
