import Router from 'vue-router';

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@pages/Home.vue')
    },
    {
      path: '/about',
      component: () => import('@pages/About.vue')
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/portfolio',
      component: () => import('@pages/Portfolio.vue')
    },
    {
      path: '/contact',
      component: () => import('@pages/Contact.vue')
    },
    { 
      path: '/admin',
      component: () => import('@pages/AdminPanel.vue')
    },
    {
      path: '/login',
      component: () => import('@pages/Login.vue')
    }


  ]
});
