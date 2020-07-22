import Router from 'vue-router';
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/:lang?/about',
      name: 'About',
      component: () => import('@pages/About.vue')
    },
    {
      path: '/:lang?/portfolio',
      name: 'Portfolio',
      component: () => import('@pages/Portfolio.vue')
    },
    {
      path: '/:lang?/contact',
      name: 'Contact',
      component: () => import('@pages/Contact.vue')
    },
    {
      path: '/:lang?/home',
      alias: ['/:lang?'],
      name: 'Home',
      component: () => import('@pages/Home.vue'),
    },
    { 
      path: '/admin',
      name: 'Admin',
      component: () => import('@pages/AdminPanel.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@pages/Login.vue')
    },
   
    { 
      path: '/404', 
      name: '404', 
      component: () => import('@pages/404.vue'), 
    },
    { 
      path: '*', 
      redirect: '/404' 
    }

  ]
});


router.beforeEach((to, from, next) => {
  if(to.name === 'Admin' || to.name === 'Login' || to.name === '404') {
    return next()
  }
  if (to.params.lang !== undefined && router.app.$ml.list.indexOf(to.params.lang) === -1) {
    return next({name: '404'})
  }
  if(router.app.$ml.list.indexOf(to.params.lang) === -1) {
  return next({ path: `/${router.app.$ml.current}${to.path}`, replace: true})
  }
  next();
});

export default router;