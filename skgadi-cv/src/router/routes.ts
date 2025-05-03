import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'profile',
        component: () => import('pages/MyProfile.vue'),
        name: 'profile',
      },
      {
        path: 'view/:contentId?/:categoryId?',
        component: () => import('pages/ViewPage.vue'),
        name: 'view',
      },
      {
        path: 'edit/:contentId?/:categoryId?',
        component: () => import('pages/EditPage.vue'),
        name: 'edit',
      },
      {
        path: 'create',
        component: () => import('pages/CreatePage.vue'),
        name: 'create',
      },
      {
        path: 'category/:categoryId?',
        component: () => import('pages/CategoryPage.vue'),
        name: 'category',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
