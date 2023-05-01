import { lazy } from 'solid-js';

const routes = [
  {
    path: '/',
    name: 'Admin Overview',
    component: lazy(() => import('../pages/AdminOverview/AdminOverview')),
  },
  {
    path: '/dids',
    name: 'DIDs',
    component: lazy(() => import('../pages/DIDs/DIDs'))
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: lazy(() => import('../pages/Credentials/Credentials'))
  },
  {
    path: '/verify',
    name: 'Verify',
    component: lazy(() => import('../pages/Verify/Verify')),
  },
  {
    path: '/automate',
    name: 'Automate',
    component: lazy(() => import('../pages/Automate/Automate')),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: lazy(() => import('../pages/Settings/Settings')),
  },
];

export default routes;