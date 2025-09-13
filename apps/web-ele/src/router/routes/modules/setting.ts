import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 4,
      title: $t('tbox.menu.setting'),
    },
    name: 'setting',
    path: '/setting',
    component: () => import('#/views/setting/about/index.vue'),
  },
];

export default routes;
