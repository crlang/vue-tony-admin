import { withInstall, withNoopInstall } from '@/utils'
import list from './src/index.vue'
import listItem from './src/item.vue'
import listItemMeta from './src/meta.vue'

// todo: 暂没有更好的想法，组件将会重构
export const List = withInstall(list, {
  listItem,
})
export const ListItem = withNoopInstall(listItem)
export const ListItemMeta = withNoopInstall(listItemMeta)
export default List
