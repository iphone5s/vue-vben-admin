import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 2,
      title: $t('tbox.menu.certificate'),
    },
    name: 'certificate',
    path: '/certificate',
    component: () => import('#/views/certificate/list/index.vue'),
  },
];

export default routes;
