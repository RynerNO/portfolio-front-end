import Router from 'vue-router';

import Home from '@pages/Home.vue';

import About from '@pages/About.vue';

import Portfolio from '@pages/Portfolio.vue';

import Contact from '@pages/Contact.vue';

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/portfolio',
      component: Portfolio
    },
    {
      path: '/contact',
      component: Contact
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
