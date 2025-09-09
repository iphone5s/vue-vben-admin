import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 1,
      title: $t('tbox.menu.appstore'),
    },
    name: 'appstore',
    path: '/appstore',
    component: () => import('#/views/dashboard/analytics/index.vue'),
  },
];

export default routes;
