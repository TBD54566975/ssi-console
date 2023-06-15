import { lazy } from 'solid-js';

const routes = [
  {
    path: '/',
    name: 'Admin Overview',
    component: lazy(() => import('@/pages/Admin/AdminOverview/AdminOverview')),
  },
  {
    path: '/dids',
    name: 'DIDs',
    component: lazy(() => import('@/pages/Admin/DIDs/DIDs')),
    children: [
        {
          path: '',
          name: 'My DIDs',
          component: lazy(() => import('@/pages/Admin/DIDs/views/MyDIDs/MyDIDs')),
        },
        // {
        //   path: 'trusted-dids',
        //   name: 'Trusted DIDs',
        //   component: lazy(() => import('@/pages/Admin/DIDs/views/TrustedDIDs/TrustedDIDs')),
        // },
    ],
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: lazy(() => import('@/pages/Admin/Credentials/Credentials')),
    children: [
        {
            path: '',
            name: 'Credentials',
            component: lazy(() => import('@/pages/Admin/Credentials/views/CredentialManifests/CredentialManifests')),
        },
        {
            path: 'history',
            name: 'History',
            component: lazy(() => import('@/pages/Admin/Credentials/views/IssuedCredentials/IssuedCredentials')),
        },
        {
            path: 'applications',
            name: 'Applications',
            component: lazy(() => import('@/pages/Admin/Credentials/views/Applications/Applications')),
        },
    ],
  },
  {
    path: '/verification',
    name: 'Verification',
    component: lazy(() => import('@/pages/Admin/Verification/Verification')),
    children: [
        {
            path: '',
            name: 'Submission Links',
            component: lazy(() => import('@/pages/Admin/Verification/views/Requests/Requests')),
        },
        {
            path: 'submissions',
            name: 'Submissions',
            component: lazy(() => import('@/pages/Admin/Verification/views/Submissions/Submissions')),
        }
    ],
  },
//   {
//     path: '/settings',
//     name: 'Settings',
//     component: lazy(() => import('@/pages/Admin/Settings/Settings')),
//   }
];

export default routes;

export const dynamicRoutes = [
    {
        path: '/credentials/:id',
        name: 'Details',
        component: lazy(() => import('@/pages/Admin/Credentials/views/CredentialManifests/Details/Details')),
    },
    {
        path: '/verification/:id',
        name: 'Details',
        component: lazy(() => import('@/pages/Admin/Verification/views/Requests/Details/Details')),
    },
    {
        path: '/credentials/history/:id',
        name: 'Details',
        component: lazy(() => import('@/pages/Admin/Credentials/views/IssuedCredentials/Details/Details')),
    },
]

export const intakeRoutes = [
    {
        path: '/apply/:id',
        name: 'Apply',
        component: lazy(() => import('@/pages/Intake/Apply/Apply')),
    },
    {
        path: '/submit/:id',
        name: 'Submit',
        component: lazy(() => import('@/pages/Intake/Submit/Submit')),
    },
    {
        path: '/verify',
        name: 'Submit',
        component: lazy(() => import('@/pages/Intake/Verify/Verify')),
    },
]