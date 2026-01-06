# Scrutiny React Frontend

Modern React 19 frontend for Scrutiny, rewritten from Angular.

## Tech Stack

- **React 19** + TypeScript 5.9
- **Vite 7** - Lightning fast build tool
- **TailwindCSS 4** - Utility-first CSS
- **shadcn/ui** - Beautiful, accessible components
- **TanStack Query v5** - Powerful data fetching
- **TanStack Router v1** - Type-safe routing
- **ApexCharts** - Interactive charts
- **Vitest** - Fast unit testing with coverage
- **pnpm** - Fast, disk-efficient package manager

## Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run tests once (CI)
pnpm test:run

# Run tests with coverage
pnpm test:coverage

# Lint
pnpm lint

# Preview production build
pnpm preview
```

## Docker

### Development with docker-compose:

```bash
# From the scrutiny root directory
docker-compose -f docker-compose.react-dev.yaml up --build

# Access the app at http://localhost:4200
# Backend API at http://localhost:8080
```

### Production build:

The React frontend is built as static files and embedded into the Go backend binary. See `docker/Dockerfile.web` for the multi-stage build process.

```bash
# From the scrutiny root directory
docker build -f docker/Dockerfile.web -t scrutiny-web .
docker run -p 8080:8080 scrutiny-web
```

## Project Structure

```
src/
├── api/                # API client functions
│   ├── client.ts       # Axios configuration
│   ├── dashboard.ts    # Dashboard endpoints
│   ├── device.ts       # Device endpoints
│   ├── settings.ts     # Settings endpoints
│   ├── query.ts        # TanStack Query setup
│   └── index.ts        # Exports
├── components/         # React components
│   ├── ui/             # shadcn/ui components
│   ├── dashboard/      # Dashboard-specific
│   ├── detail/         # Device detail
│   └── layout/         # Layout components
├── config/             # App configuration
│   ├── defaults.ts     # Default settings
│   └── index.ts        # Exports
├── constants/          # Constant values
│   ├── device-status.ts # Device/attribute status codes
│   ├── metrics.ts      # Metrics thresholds
│   └── index.ts        # Exports
├── hooks/              # Custom React hooks
│   ├── useAppConfig.ts # App configuration hook
│   ├── useDashboard.ts # Dashboard data hook
│   └── useDeviceDetail.ts # Device detail hook
├── models/             # TypeScript interfaces
│   ├── measurements/   # SMART data models
│   └── thresholds/     # Threshold models
├── pages/              # Route pages
│   ├── Dashboard.tsx   # Main dashboard
│   └── DeviceDetail.tsx # Device detail view
├── routes/             # TanStack Router config
├── test/               # Test files
│   ├── setup.ts        # Vitest setup
│   └── *.test.ts       # Unit tests
├── types/              # Type definitions
│   ├── api.ts          # API response types
│   └── settings.ts     # Settings types
├── utils/              # Utility functions
│   ├── device-*.ts     # Device utilities
│   ├── temperature.ts  # Temperature conversion
│   ├── file-size.ts    # File size formatting
│   └── export.ts       # Export functionality
├── version.ts          # Auto-generated version info
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Key Differences from Angular Version

### Simplified Architecture
- **No RxJS** - TanStack Query for data fetching
- **No Modules** - Just components and hooks
- **No Services** - Hooks replace injectable services
- **No Pipes** - Utility functions instead

### Improved DX
- **Faster builds** - Vite vs Webpack (10x faster)
- **Smaller bundles** - 107KB gzipped vs ~500KB
- **Hot reload** - Instant updates during development
- **Better types** - Full TypeScript inference

### Same Functionality
- ✅ All device monitoring features
- ✅ Dashboard with device cards
- ✅ Device detail with S.M.A.R.T data
- ✅ Temperature charts
- ✅ Archive/export functionality
- ✅ Same API integration
- ✅ Identical visual design

## API Integration

The frontend expects the Scrutiny backend API at `/api/`. 

- **Production**: Static files are served by the Go backend, which also handles API routes
- **Development**: Vite dev server runs on port 4200, proxies API requests to backend on port 8080

### Key Endpoints
- `GET /api/summary` - Dashboard device summary
- `GET /api/summary/temp?duration_key=week` - Temperature history
- `GET /api/device/:wwn` - Device details
- `GET /api/settings` - Application settings
- `POST /api/settings` - Update settings
- `POST /api/device/:wwn/archive` - Archive device
- `DELETE /api/device/:wwn` - Delete device

## Version Information

The `src/version.ts` file is auto-generated during CI/CD builds via `git.version.sh`. For local development, it defaults to `'development'`.

## Contributing

This is a complete rewrite of the Angular frontend to modernize the codebase and improve maintainability. The goal is pixel-perfect visual replication while using modern React patterns.
