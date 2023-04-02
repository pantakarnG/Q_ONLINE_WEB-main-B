export const Menu = [
  {
    id: 1,
    title: 'การจองคิว',
    icon: 'fa-solid fa-q',
    pathname: '/author/book-an-appointment',
    type: 1,
  },
  {
    id: 2,
    title: 'ตารางเปิดจองคิว',
    icon: 'fa-solid fa-calendar-days',
    pathname: '/',
    type: 1,
  },
  {
    id: 3,
    title: 'จัดการการจองคิว',
    icon: 'fa-solid fa-gears',
    pathname: '#',
    type: 2,
    subMenu: [
      {
        id: 31,
        title: 'จัดการคิวผู้ป่วย',
        icon: 'fa-solid fa-minus',
        pathname: '/author/Manage',
      },
      {
        id: 32,
        title: 'จัดการเรียกคิว',
        icon: 'fa-solid fa-minus',
        pathname: '/author/Main/callqueue',
      },
    
    ],
  },
   {
     id: 4,
     title: 'ดูข้อมูลการจองคิว',
     icon: 'fa-solid fa-calendar-days',
     pathname: '/author/history',
     type: 1,
   },
   {
    id: 5,
    title: 'การประเมินการจองคิว',
    icon: 'fa-solid fa-calendar-days',
    pathname: '/view/questionnaire',
    type: 1,
  },
];
