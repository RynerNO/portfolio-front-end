import Vue from 'vue';

import Main from './pages/Main.vue';

import './styles/main.global.scss';

import router from './router';

import Router from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faBriefcase, faFileAlt, faExternalLinkAlt, faTimes, faFileCode, faHourglass, faEnvelope, faComments, faPaperPlane, faHome} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faSkype } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add([faUser, faBriefcase, faFileAlt, faHourglass, faExternalLinkAlt,  faTimes, faFileCode, faEnvelope, faComments, faPaperPlane, faHome, faGithub, faSkype])
import store from '@store/store';
Vue.use(Router);
Vue.component('font-awesome', FontAwesomeIcon)
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Main)
});
