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
            component: lazy(() => import('../pages/Credentials/views/CredentialManifests/CredentialManifests')),
        },
        {
            path: 'history',
            name: 'History',
            component: lazy(() => import('../pages/Credentials/views/IssuedCredentials/IssuedCredentials')),
        },
        {
            path: 'applications',
            name: 'Applications',
            component: lazy(() => import('../pages/Credentials/views/Applications/Applications')),
        },
    ],
  },
  {
    path: '/verification',
    name: 'Verification',
    component: lazy(() => import('../pages/Verification/Verification')),
    children: [
        {
            path: '',
            name: 'Submission Links',
            component: lazy(() => import('../pages/Verification/views/Requests/Requests')),
        },
        {
            path: 'submissions',
            name: 'Submissions',
            component: lazy(() => import('../pages/Verification/views/Submissions/Submissions')),
        }
    ],
  },
  {
    path: '/settings',
    name: 'Settings',
    component: lazy(() => import('../pages/Settings/Settings')),
  },
];

export default routes;