# Zod OpenAPI Hono - Todo API

A production-ready RESTful Todo API built with [Hono](https://hono.dev/), [Zod OpenAPI](https://github.com/honojs/middleware/tree/main/packages/zod-openapi), and TypeScript. Features full OpenAPI 3.0 documentation with interactive Scalar UI.

## ✨ Features

- **🚀 Hono Framework** - Ultra-fast, lightweight web framework optimized for edge runtimes
- **📘 TypeScript** - Full TypeScript support with strict type checking
- **📋 OpenAPI 3.0** - Auto-generated OpenAPI specification with `@hono/zod-openapi`
- **📚 Interactive Documentation** - Built-in Scalar API reference UI
- **✅ Zod Validation** - Type-safe request/response validation
- **🚨 Problem Details** - RFC 7807 HTTP Problem Details for standardized error responses
- **🆔 UUID v7** - Modern UUID v7 for unique identifiers
- **🔒 Environment Validation** - Type-safe environment variables with Zod
- **🎨 Code Quality Tools** - ESLint, Prettier, and Commitlint pre-configured
- **🔄 Hot Reload** - Fast development with tsx watch mode
- **📦 Path Aliases** - Clean imports with `@/` aliases
- **🪝 Git Hooks** - Automated linting and commit validation with Husky

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn

## 🔑 Key Technologies

This project showcases the integration of several powerful libraries:

- **[@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)**: Integrates Zod schemas with OpenAPI 3.0, enabling automatic API documentation generation and request/response validation
- **[@scalar/hono-api-reference](https://scalar.com/)**: Provides a beautiful, interactive API documentation UI with dark mode support
- **[http-problem-details](https://www.npmjs.com/package/http-problem-details)**: Implements RFC 7807 standard for consistent error responses
- **[uuid v7](https://www.npmjs.com/package/uuid)**: Generates time-ordered, globally unique identifiers

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd zod-open-api-hono
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
# Environment
NODE_ENV=development

# Server
PORT=3000

# Add your additional environment variables here
```

### 4. Run development server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### 5. View API Documentation

Open your browser and navigate to:

- **Interactive API Docs**: [http://localhost:3000/reference](http://localhost:3000/reference)
- **OpenAPI JSON Spec**: [http://localhost:3000/doc](http://localhost:3000/doc)

## 📁 Project Structure

```
zod-open-api-hono/
├── src/
│   ├── features/
│   │   └── todos/
│   │       ├── addTodo.ts      # POST /todos - Create todo
│   │       ├── listTodos.ts    # GET /todos - List all todos
│   │       ├── findTodo.ts     # GET /todos/:id - Get todo by ID
│   │       ├── checkTodo.ts    # PUT /todos/:id - Update todo
│   │       └── todo.ts         # Todo schema and data store
│   ├── schemas/
│   │   ├── pagination.ts       # Pagination schema
│   │   └── problemDocument.ts  # RFC 7807 error schema
│   ├── env.ts                  # Environment variable validation
│   ├── hooks.ts                # OpenAPI validation hooks
│   ├── http-status-codes.ts    # HTTP status code constants
│   └── index.ts                # Application entry point
├── dist/                       # Compiled output (generated)
├── .vscode/                    # VS Code configuration
├── .husky/                     # Git hooks
├── commitlint.config.ts        # Commit message linting
├── eslint.config.ts            # ESLint configuration
├── prettier.config.ts          # Prettier configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies and scripts
```

## 🛠️ Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot reload |
| `npm run build`        | Build for production                     |
| `npm start`            | Run production build                     |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting                    |
| `npm run lint`         | Lint code with ESLint                    |
| `npm run lint:fix`     | Fix linting issues                       |
| `npm run lint:format`  | Fix linting and format code              |
| `npm run commit`       | Interactive commit with Commitlint       |

## 📝 Todo Schema

The Todo model is defined using Zod with OpenAPI extensions:

```typescript
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
```

## 🔧 Configuration

### Environment Variables

Environment variables are validated using Zod in `src/env.ts`. Add your schema:

```typescript
const ENVSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  // Add more variables here
});
```

### Path Aliases

Import aliases are configured in `tsconfig.json`:

```typescript
// Instead of: import { helper } from '../../../utils/helper'
import { helper } from '@/utils/helper';
```

### ESLint & Prettier

The project uses:

- **ESLint** with TypeScript recommended rules
- **Prettier** for code formatting
- **Automatic formatting** on save (VS Code)
- **Automatic lint fixes** on save (VS Code)

### Commit Messages

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
feat: add user authentication
fix(api): resolve CORS issue
docs: update README
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`, `revert`

## 📡 API Endpoints

### Todo Operations

| Method | Endpoint     | Description       | Request Body          |
| ------ | ------------ | ----------------- | --------------------- |
| POST   | `/todos`     | Create a new todo | `{ title: string }`   |
| GET    | `/todos`     | List all todos    | Query: `page`, `size` |
| GET    | `/todos/:id` | Get todo by ID    | -                     |
| PUT    | `/todos/:id` | Update todo       | `{ completed: bool }` |

### Example Requests

#### Create a Todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'
```

#### List Todos

```bash
curl http://localhost:3000/todos?page=0&size=10
```

#### Get Todo by ID

```bash
curl http://localhost:3000/todos/019af0ad-4ac8-7052-a609-24a539d353cd
```

#### Mark Todo as Complete

```bash
curl -X PUT http://localhost:3000/todos/019af0ad-4ac8-7052-a609-24a539d353cd \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## 🏗️ Architecture

### OpenAPI Routes

Routes are defined using `@hono/zod-openapi` with full type safety:

```typescript
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

const config = createRoute({
  method: 'post',
  path: '/todos',
  tags: ['Tasks'],
  request: {
    body: {
      content: {
        'application/json': { schema: todoSchema },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': { schema: todoSchema },
      },
      description: 'Todo created successfully',
    },
  },
});

const handler: RouteHandler<typeof config> = async c => {
  const body = c.req.valid('json');
  // Handler logic
};
```

### Error Handling with Problem Details

All errors follow [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807) Problem Details standard:

```json
{
  "type": "/problems/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "Request validation failed",
  "instance": "/todos",
  "errors": [
    {
      "path": "title",
      "message": "Too small: expected string to have >=1 characters",
      "code": "too_small"
    }
  ]
}
```

## 🔨 Extending the API

### Adding a New Feature

1. **Create a schema** in `src/features/<feature>/<feature>.ts`:

```typescript
import { z } from '@hono/zod-openapi';

export const userSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
  })
  .openapi('User');
```

2. **Create route handlers** (e.g., `addUser.ts`, `listUsers.ts`):

```typescript
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

const config = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  request: {
    body: {
      content: {
        'application/json': { schema: createUserSchema },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': { schema: userSchema },
      },
      description: 'User created',
    },
  },
});

const handler: RouteHandler<typeof config> = async c => {
  // Implementation
};

export const addUserRoute = new OpenAPIHono({
  defaultHook,
}).openapi(config, handler);
```

3. **Register routes** in `src/index.ts`:

```typescript
import { addUserRoute } from '@/features/users/addUser.js';

const app = new OpenAPIHono()
  .doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Your API',
    },
  })
  .route('/', addUserRoute);
```

The OpenAPI documentation and Scalar UI will automatically update!

## 🧪 Testing

Add your testing setup (Jest, Vitest, etc.) as needed for your project.

## 📦 Deployment

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

### Deploy to your platform

The built application in `dist/` can be deployed to:

- **Node.js servers**
- **Docker containers**
- **Cloud platforms** (AWS, Azure, GCP)
- **PaaS** (Heroku, Railway, Render)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hono](https://hono.dev/) - The web framework
- [Zod OpenAPI](https://github.com/honojs/middleware/tree/main/packages/zod-openapi) - OpenAPI integration
- [Scalar](https://scalar.com/) - Beautiful API documentation UI
- [Zod](https://zod.dev/) - Schema validation
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- Community contributors and maintainers

## 📚 Resources

- [Hono Documentation](https://hono.dev/docs)
- [Zod OpenAPI Guide](https://hono.dev/examples/zod-openapi)
- [OpenAPI Specification](https://swagger.io/specification/)
- [RFC 7807 Problem Details](https://datatracker.ietf.org/doc/html/rfc7807)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
- [Commitlint](https://commitlint.js.org/)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)

---

**Happy coding! 🚀**
