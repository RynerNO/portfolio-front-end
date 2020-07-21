import { MLCreate } from 'vue-multilanguage'

import ru from '@locales/lang/ru'
import en from '@locales/lang/en'

export default new MLCreate({
  initial: 'en',
  save: true,
  languages: [
    
    ru, en
    
  ]
})
