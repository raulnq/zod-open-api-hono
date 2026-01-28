import { z } from '@hono/zod-openapi';

export const todoSchema = z
  .object({
    todoId: z.uuidv7().openapi({
      example: '019af0ad-4ac8-7052-a609-24a539d353cd',
    }),
    title: z.string().min(1).openapi({
      example: 'Buy groceries',
    }),
    completed: z.boolean().default(false).openapi({
      example: false,
    }),
  })
  .openapi('Todo');

export type Todo = z.infer<typeof todoSchema>;

export const todos: Todo[] = [];

export const tags = ['Tasks'];
