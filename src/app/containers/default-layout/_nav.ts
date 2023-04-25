import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Menu'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: '5'
    }
  },
 

  {
    name: 'Customers',
    url: '/customers-list',
    iconComponent: { name: 'cilUserFollow' }
  },
  {
    name: 'Messages Log',
    url: '/reminders',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Sent Reminders',
        url: '/templates-list'
      },
      {
        name: 'Pending Reminders',
        url: '/base/breadcrumbs'
      },

       ]
  },
  {
    name: 'Extra',
    title: true
  },
  {
    name: 'Preference',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Manage Templates',
        url: '/manage-templates'
      },
      {
        name: 'Manage Statuses',
        url: '/manage-statuses'
      },
      {
        name: 'Change Settings',
        url: '/settings'
      },
 
       ]
  },
 
  
];
