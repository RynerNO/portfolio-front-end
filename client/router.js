import Router from 'vue-router';

import Home from '@pages/Home.vue';

import About from '@pages/About.vue';

import Portfolio from '@pages/Portfolio.vue';
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
    }

  ]
});
