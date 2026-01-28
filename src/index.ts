import { serve } from '@hono/node-server';
import { ENV } from '@/env.js';
import { OpenAPIHono } from '@hono/zod-openapi';
import { addRoute } from '@/features/todos/addTodo.js';
import { Scalar } from '@scalar/hono-api-reference';
import { listRoute } from './features/todos/listTodos.js';
import { findRoute } from './features/todos/findTodo.js';
import { checkRoute } from './features/todos/checkTodo.js';

const app = new OpenAPIHono()
  .doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Todo API',
    },
  })
  .get(
    '/reference',
    Scalar({
      url: '/doc',
      theme: 'kepler',
      layout: 'classic',
      darkMode: true,
    })
  )
  .route('/', addRoute)
  .route('/', listRoute)
  .route('/', findRoute)
  .route('/', checkRoute);

serve(
  {
    fetch: app.fetch,
    port: ENV.PORT,
  },
  info => {
    console.log(
      `Server(${ENV.NODE_ENV}) is running on http://localhost:${info.port}`
    );
  }
);
