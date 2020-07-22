import Vue from 'vue'
import { MLInstaller, MLCreate } from 'vue-multilanguage'

Vue.use(MLInstaller)
import ru from '@locales/lang/ru'
import en from '@locales/lang/en'

export default new MLCreate({
  initial: 'en',
  save: true,
  languages: [
    
    ru, en
    
  ]
})
