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
    component: lazy(() => import('../pages/DIDs/DIDs')),
    children: [
        {
          path: '',
          name: 'My DIDs',
          component: lazy(() => import('../pages/DIDs/views/MyDIDs/MyDIDs')),
        },
        {
          path: 'trusted-dids',
          name: 'Trusted DIDs',
          component: lazy(() => import('../pages/DIDs/views/TrustedDIDs/TrustedDIDs')),
        },
    ],
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: lazy(() => import('../pages/Credentials/Credentials')),
    children: [
        {
          path: '',
          name: 'Credentials',
          component: lazy(() => import('../pages/Credentials/views/IssuedCredentials/IssuedCredentials')),
        },
        {
          path: 'manifests',
          name: 'Credential Manifests',
          component: lazy(() => import('../pages/Credentials/views/CredentialManifests/CredentialManifests')),
        },
    ],
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