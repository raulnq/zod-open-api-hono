import {
  createRoute,
  OpenAPIHono,
  z,
  type RouteHandler,
} from '@hono/zod-openapi';
import { todoSchema, todos, tags } from './todo.js';
import { ProblemDocument } from 'http-problem-details/dist/ProblemDocument.js';
import { problemDocumentSchema } from '@/schemas/problemDocument.js';
import { OK, NOT_FOUND } from '@/http-status-codes.js';
import { defaultHook } from '@/hooks.js';

export const config = createRoute({
  path: '/todos/{todoId}',
  method: 'get',
  tags: tags,
  request: {
    params: z.object({
      todoId: z.uuidv7().openapi({
        param: {
          name: 'todoId',
          in: 'path',
          required: true,
        },
        example: '019af0ad-4ac8-7052-a609-24a539d353cd',
      }),
    }),
  },
  responses: {
    [OK]: {
      content: {
        'application/json': {
          schema: todoSchema,
        },
      },
      description: 'Get a todo by ID',
    },
    [NOT_FOUND]: {
      content: {
        'application/json': {
          schema: problemDocumentSchema,
        },
      },
      description: 'Todo not found',
    },
  },
});
type Config = typeof config;

const handler: RouteHandler<Config> = async c => {
  const { todoId } = c.req.valid('param');
  const todo = todos.find(t => t.todoId === todoId);
  if (!todo) {
    return c.json(
      new ProblemDocument({
        type: '/problems/resource-not-found',
        title: 'Resource not found',
        status: NOT_FOUND,
        detail: `Todo with id ${todoId} not found`,
        instance: c.req.path,
      }),
      NOT_FOUND
    );
  }
  return c.json(todo, OK);
};

export const findRoute = new OpenAPIHono({
  strict: false,
  defaultHook,
}).openapi(config, handler);
