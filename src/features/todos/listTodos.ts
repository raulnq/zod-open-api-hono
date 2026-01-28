import { createRoute, OpenAPIHono, type RouteHandler } from '@hono/zod-openapi';
import { todoSchema, todos, tags } from './todo.js';
import {
  paginationParametersSchema,
  createPageSchema,
} from '@/schemas/pagination.js';
import { OK } from '@/http-status-codes.js';
import { defaultHook } from '@/hooks.js';

export const config = createRoute({
  path: '/todos',
  method: 'get',
  tags: tags,
  request: {
    query: paginationParametersSchema,
  },
  responses: {
    [OK]: {
      content: {
        'application/json': {
          schema: createPageSchema(todoSchema),
        },
      },
      description: 'List all todos',
    },
  },
});
type Config = typeof config;

const handler: RouteHandler<Config> = async c => {
  const { pageNumber, pageSize } = c.req.valid('query');
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTodos = todos.slice(startIndex, endIndex);
  return c.json(
    {
      items: paginatedTodos,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(todos.length / pageSize),
      totalCount: todos.length,
    },
    OK
  );
};

export const listRoute = new OpenAPIHono({
  strict: false,
  defaultHook,
}).openapi(config, handler);
