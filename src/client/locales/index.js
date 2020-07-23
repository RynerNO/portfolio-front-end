import Vue from 'vue'
import { MLInstaller, MLCreate } from 'vue-multilanguage'

Vue.use(MLInstaller)
import ru from '@locales/lang/ru'
import en from '@locales/lang/en'
const defaultLang = 'en'
Vue.prototype.$defaultLang = defaultLang
export default new MLCreate({
  initial: defaultLang,
  save: true,
  languages: [
    
    ru, en
    
  ]
})
