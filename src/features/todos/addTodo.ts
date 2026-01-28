import { createRoute, OpenAPIHono, type RouteHandler } from '@hono/zod-openapi';
import { v7 as uuidv7 } from 'uuid';
import { todoSchema, todos, tags } from './todo.js';
import { CREATED, BAD_REQUEST } from '@/http-status-codes.js';
import { defaultHook } from '@/hooks.js';
import { problemDocumentSchema } from '@/schemas/problemDocument.js';

const addTodoSchema = todoSchema
  .omit({ todoId: true, completed: true })
  .openapi('CreateTodo');

const config = createRoute({
  method: 'post',
  path: '/todos',
  tags: tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: addTodoSchema,
        },
      },
      description: 'Todo to create',
      required: true,
    },
  },
  responses: {
    [CREATED]: {
      content: {
        'application/json': {
          schema: todoSchema,
        },
      },
      description: 'Create a new todo',
    },
    [BAD_REQUEST]: {
      content: {
        'application/json': {
          schema: problemDocumentSchema,
        },
      },
      description: 'Invalid request data',
    },
  },
});

type Config = typeof config;

const handler: RouteHandler<Config> = async c => {
  const { title } = c.req.valid('json');
  const todo = {
    todoId: uuidv7(),
    title,
    completed: false,
  };
  todos.push(todo);
  return c.json(todo, CREATED);
};

export const addRoute = new OpenAPIHono({
  strict: false,
  defaultHook,
}).openapi(config, handler);
