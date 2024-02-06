import { IconCalendarEvent } from '@tabler/icons';

const icons = {
  IconCalendarEvent
};

const competition = {
  id: 'pages',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Competition',
      type: 'collapse',
      icon: icons.IconCalendarEvent,

      children: [
        {
          id: 'competition.view',
          title: 'Competition Leaderboard',
          type: 'item',
          url: '/competition/view'
        },
        {
          id: 'competition.register',
          title: 'Register Players',
          type: 'item',
          url: '/competition/registerplayers'
        },
        {
          id: 'competition.events',
          title: 'View Competion Events',
          type: 'item',
          url: '/competition/events'
        }
      ]
    }
  ]
};

export default competition;
