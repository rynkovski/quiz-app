# Quiz Application Monorepo

This is a Turborepo-based monorepo containing a full-stack quiz application with a Next.js frontend and NestJS backend.

## What's Inside?

This monorepo includes the following packages and applications:

### Apps
- `frontend`: A [Next.js](https://nextjs.org/) application providing the user interface for:
  - Taking quizzes
  - Managing quiz categories 
  - Creating/editing questions
  - Viewing quiz results
- `backend`: A [NestJS](https://nestjs.com/) application providing:
  - REST API endpoints for quiz functionality
  - Question and category management
  - Quiz scoring and results
  - PostgreSQL database integration via Prisma

### Packages
- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations 
- `@repo/shared`: Shared types and utilities

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Core Features

- Quiz taking with timed questions
- Category-based question organization
- Question management interface
- Quiz results tracking
- Modern UI with Tailwind CSS
- Full TypeScript support
- Prisma ORM for database access
- API-first backend design

## Screenshots

![Landing Page](<apps/frontend/public/Quiz App.jpeg>)
![Category select](<apps/frontend/public/Quiz App 2.jpeg>)
![Quiz start](<apps/frontend/public/Quiz App 3.jpeg>)

## Roadmap

- [ ] Add Toast notifications
- [ ] Add User System & Authentication
- [ ] Add Enhanced Quiz Features
- [ ] Add Performance optimization
- [ ] Add Dark/light mode
- [ ] Redesign



## Setup & Development

### Prerequisites
- Node.js 16+
- PNPM package manager
- PostgreSQL database

### Getting Started

1. Install dependencies:
```sh
pnpm install
```

2. Set up your database:
```sh
cd apps/backend
pnpm prisma migrate dev
```

3. Start development servers:
```sh
pnpm dev
```

This will start both frontend and backend in development mode.

### Build

To build all apps and packages:

```sh
pnpm build
```

### Remote Caching

This repo supports Turborepo's Remote Caching feature. To enable it:

1. Create a [Vercel account](https://vercel.com/signup)
2. Link your repo:
```sh
npx turbo login
npx turbo link
```

## Useful Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
