# Overview

This is a React-based business analytics dashboard application built with a full-stack architecture. The application features a modern, dark-themed UI with real-time data visualization, user authentication, and profile management. It's designed as a comprehensive analytics platform with mock data simulation for demonstration purposes.

The application uses a monorepo structure with separate client and server directories, shared schema definitions, and a robust build system. The frontend emphasizes modern UI/UX principles with glassmorphism effects, smooth animations, and responsive design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server. The application follows a component-based architecture with clear separation of concerns.

**UI Framework**: Built with Radix UI primitives and Shadcn/ui components, providing a consistent design system with dark theme support. Uses Tailwind CSS for styling with custom CSS variables for theming.

**State Management**: 
- React Context for authentication state management
- TanStack Query for server state and data fetching
- Local state with React hooks for component-level state

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router.

**Animation**: Framer Motion for sophisticated animations including page transitions, hover effects, and chart animations with staggered loading effects.

**Data Visualization**: Recharts library for interactive charts and graphs with custom tooltips and responsive design.

## Backend Architecture

**Server Framework**: Express.js with TypeScript, providing RESTful API endpoints and middleware support.

**Development Setup**: Integrated Vite middleware for development with HMR (Hot Module Replacement) and custom logging.

**Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage) for development. The interface is designed to be easily swapped with database implementations.

**Authentication**: Session-based authentication system (infrastructure present via connect-pg-simple but currently using mock auth).

## Database Design

**ORM**: Drizzle ORM configured for PostgreSQL with schema definitions in TypeScript.

**Schema**: User management with username/password authentication. Schema is defined in shared directory for type safety across client and server.

**Migrations**: Drizzle Kit for database migrations and schema management.

## Design Patterns

**Monorepo Structure**: Shared code between client and server with TypeScript path mapping for clean imports.

**Component Composition**: Reusable UI components with consistent props interface and theming support.

**Mock Data Simulation**: Sophisticated mock data system that simulates real-time updates using intervals, providing realistic demo experience.

**Responsive Design**: Mobile-first approach with adaptive layouts using Tailwind CSS breakpoints.

**Glass Morphism UI**: Modern design with backdrop blur effects, translucent cards, and cursor glow interactions.

# External Dependencies

## Core Framework Dependencies
- **React 18**: Frontend framework with hooks and context
- **Express.js**: Backend web framework
- **TypeScript**: Type safety across the entire stack
- **Vite**: Build tool and development server

## UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## Data and State Management
- **TanStack Query**: Server state management and caching
- **Drizzle ORM**: Type-safe SQL ORM
- **Zod**: Runtime type validation

## Charts and Visualization
- **Recharts**: Chart library built on D3

## Database
- **PostgreSQL**: Primary database (configured via Neon serverless)
- **connect-pg-simple**: PostgreSQL session store

## Development Tools
- **ESBuild**: Fast bundling for production builds
- **TSX**: TypeScript execution for development
- **PostCSS**: CSS processing with Autoprefixer

## Authentication Infrastructure
- **bcrypt**: Password hashing (via dependencies)
- **express-session**: Session management middleware

The application is structured to easily scale from development with mock data to production with real database connections and external API integrations.