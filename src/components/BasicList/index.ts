import list from './src/BasicList.vue'
import listItem from './src/BasicListItem.vue'
import listMeta from './src/BasicListItemMeta.vue'
import { withInstall } from '@/utils'

export const BasicList = withInstall(list)
export const BasicListItem = withInstall(listItem)
export const BasicListItemMeta = withInstall(listMeta)
export default BasicList
