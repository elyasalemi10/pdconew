import React from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { PreSalePage } from './pages/PreSalePage';
import { BathroomPage } from './pages/BathroomPage';
import { ImprovementsPage } from './pages/ImprovementsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AgentsPage } from './pages/AgentsPage';
import { AboutPage } from './pages/AboutPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { ShowroomPage } from './pages/ShowroomPage';

// Root Route
const rootRoute = createRootRoute({
  component: PageLayout,
});

// Index Route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// Service Routes
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/pre-sale',
  component: PreSalePage,
});

const bathroomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/bathroom',
  component: BathroomPage,
});

const improvementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/improvements',
  component: ImprovementsPage,
});

const cosmeticRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/cosmetic',
  component: ImprovementsPage, // Reuse improvements page for cosmetic
});

// Projects Routes
const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/past-projects',
  component: ProjectsPage,
});

const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/past-projects/$projectId',
  component: ProjectDetailPage,
});

// Other Routes
const agentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agents',
  component: AgentsPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const showroomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/showroom',
  component: ShowroomPage,
});

const consultationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/consultation',
  component: ConsultationPage,
});

// Create Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  bathroomRoute,
  improvementsRoute,
  cosmeticRoute,
  projectsRoute,
  projectDetailRoute,
  agentsRoute,
  aboutRoute,
  showroomRoute,
  consultationRoute,
]);

// Create Router
const router = createRouter({ routeTree });

// Register Router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
