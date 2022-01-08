import { genMessage } from '../helper'
// import momentLocale from 'moment/dist/locale/en-us';
import eleLocale from 'element-plus/lib/locale/lang/en'

const modules = import.meta.globEager('./en/**/*.ts')
export default {
  message: {
    ...genMessage(modules, 'en'),
    eleLocale,
  },
  momentLocale: null,
  momentLocaleName: 'en',
}
