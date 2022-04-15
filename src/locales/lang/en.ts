import { genMessage } from '../helper'
import 'dayjs/locale/zh-cn'

import eleLocale from 'element-plus/lib/locale/lang/en'

const modules = import.meta.globEager('./en/**/*.ts')
export default {
  message: {
    ...genMessage(modules, 'en'),
    eleLocale,
  },
  dayLocaleName: 'en',
}
