import { genMessage } from '../helper'
import momentLocale from 'moment/dist/locale/zh-cn'
import eleLocale from 'element-plus/lib/locale/lang/zh-cn'

const modules = import.meta.globEager('./zh-CN/**/*.ts')
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    eleLocale,
  },
  momentLocale,
  momentLocaleName: 'zh-cn',
}
