import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 0,
      title: $t('tbox.menu.dashboard'),
    },
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('#/views/dashboard/analytics/index.vue'),
  },
];

export default routes;
