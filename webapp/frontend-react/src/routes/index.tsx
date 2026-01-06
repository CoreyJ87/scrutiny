import { createRootRoute, createRoute } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { Dashboard } from '@/pages/Dashboard';
import { DeviceDetail } from '@/pages/DeviceDetail';

// Root route uses MainLayout directly
export const rootRoute = createRootRoute({
  component: MainLayout,
});

// Dashboard route
export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

// Device detail route
export const deviceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/device/$wwn',
  component: DeviceDetail,
});

// Index route redirects to dashboard
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/web/dashboard';
    }
    return null;
  },
});

// Create route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  deviceDetailRoute,
]);

// Type for router context
export interface RouterContext {
  queryClient: QueryClient;
}

