import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 3,
      title: $t('tbox.menu.user'),
    },
    name: 'user',
    path: '/user',
    component: () => import('#/views/user/list/index.vue'),
  },
];

export default routes;
