import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const Competition = Loadable(lazy(() => import('views/competition')));
const ViewCompetition = Loadable(lazy(() => import('views/competition/viewCompetition')));
const EventCompetition = Loadable(lazy(() => import('views/competition/eventCompetition')));
const PlayerCompetition = Loadable(lazy(() => import('views/competition/playerCompetition')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'competition',
      children: [
        {
          path: '',
          element: <Competition />
        },
        {
          path: 'view',
          element: <ViewCompetition />
        },
        {
          path: 'events',
          element: <EventCompetition />
        },
        {
          path: 'registerplayers',
          element: <PlayerCompetition />
        }
      ]
    }
  ]
};

export default MainRoutes;
