import Vue from 'vue';

import Main from './pages/Main.vue';

import './styles/tailwind.scss';

import router from './router';
import Router from 'vue-router';

import '@locales'
import { MLInstaller } from 'vue-multilanguage'

import Meta from 'vue-meta'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faBriefcase, faFileAlt, faExternalLinkAlt, faTimes, faFileCode, faHourglass, faEnvelope, faComments, faPaperPlane, faHome} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faSkype } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add([faUser, faBriefcase, faFileAlt, faHourglass, faExternalLinkAlt, faTimes, faFileCode, faEnvelope, faComments, faPaperPlane, faHome, faGithub, faSkype])

import Vue2TouchEvents from 'vue2-touch-events'
 
import store from '@store/store';

Vue.use(Router);
Vue.use(Meta, {
  keyName: 'meta'
});
Vue.use(Vue2TouchEvents)
Vue.use(MLInstaller)

Vue.component('font-awesome', FontAwesomeIcon)

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Main)
});