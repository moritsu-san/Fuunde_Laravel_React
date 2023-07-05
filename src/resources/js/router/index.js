import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'answer/recent',
    },
    {
      path: '/answer',
      name: 'answer',
      component: () => import('../pages/answer/Answer.vue'),
      children: [
        {
          path: 'recent',
          component: () => import('../pages/answer/Recent.vue'),
        },
        {
          path: 'popular',
          component: () => import('../pages/answer/Popular.vue'),
        },
      ]
      
    },
    {
      path: '/odai',
      component: () => import('../pages/odai/Odai.vue'),
      children: [
        {
          path: 'recent',
          component: () => import('../pages/odai/Recent.vue'),
        },
        {
          path: 'popular',
          component: () => import('../pages/odai/Popular.vue'),
        },
      ]
    },
    {
      path: '/MC/recent',
      component: () => import('../pages/mc/Mc.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/Register.vue')
    },
    {
      path: '/threads/:id',
      component: () => import('../pages/ThreadDetail.vue')
    },
    {
      path: '/500',
      component: () => import('../pages/errors/System.vue')
    }
  ]
})

export default router