import { withInstall, withNoopInstall } from '@/utils'
import list from './src/index.vue'
import listItem from './src/item.vue'
import listItemMeta from './src/meta.vue'

export const List = withInstall(list, {
  listItem,
  listItemMeta,
})
export const ListItem = withNoopInstall(listItem)
export const ListItemMeta = withNoopInstall(listItemMeta)
export default List
