import Router from 'vue-router';
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/:lang?/about',
      name: 'about',
      component: () => import('@pages/About.vue')
    },
    {
      path: '/:lang?/portfolio',
      name: 'portfolio',
      component: () => import('@pages/Portfolio.vue')
    },
    {
      path: '/:lang?/contact',
      name: 'contact',
      component: () => import('@pages/Contact.vue')
    },
    { 
      path: '/admin',
      name: 'admin',
      component: () => import('@pages/AdminPanel.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@pages/Login.vue')
    },
    {
      path: '/:lang?',
      alias: ['/:lang?/home'],
      name: 'home',
      component: () => import('@pages/Home.vue'),
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
  if(to.name === 'admin' || to.name === 'login' || to.name === '404') {
    return next()
  }
  if (to.params.lang !== undefined && router.app.$ml.list.indexOf(to.params.lang) === -1) {
    return next({name: '404'})
  }
  if (to.params.lang === undefined && router.app.$ml.current === 'en') {
    return next()
  }
  if (to.params.lang === 'en' && router.app.$ml.current === 'en') {
    return next({name: to.name, replace: true})
  }
  if(router.app.$ml.list.indexOf(to.params.lang) === -1) {
  return next({ path: `/${router.app.$ml.current}${to.path}`, replace: true})
  }
  next();
});

export default router;