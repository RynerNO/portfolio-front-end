import Vue from 'vue';

import Main from './pages/Main.vue';

import './styles/main.scss';

import router from './router';

import Router from 'vue-router';

import authMixin from '@mixins/auth';

import flashMixin from '@mixins/flash';

import store from '@store';

Vue.use(Router);

Vue.mixin(authMixin);
Vue.mixin(flashMixin);

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Main)
});
