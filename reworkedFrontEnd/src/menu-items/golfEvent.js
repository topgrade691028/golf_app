import { IconCalendarEvent } from '@tabler/icons';

const icons = {
  IconCalendarEvent
};

const golfEvent = {
  id: 'pages',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Golf Event',
      type: 'collapse',
      icon: icons.IconCalendarEvent,

      children: [
        {
          id: 'golf.view',
          title: 'View Golf Event',
          type: 'item',
          url: '/golf/view'
        },
        {
          id: 'golfevent.register',
          title: 'View Score Card',
          type: 'item',
          url: '/golf/registerplayers'
        },
        {
          id: 'golfevent.events',
          title: 'Event Leaderboard',
          type: 'item',
          url: '/golf/events'
        }
      ]
    }
  ]
};

export default golfEvent;
