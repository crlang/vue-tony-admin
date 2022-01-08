import { withInstall, withNoopInstall } from '@/utils'
import cardGrid from './src/index.vue'
import cardGridItem from './src/item.vue'

export const CardGrid = withInstall(cardGrid, {
  CardGridItem,
})
export default CardGrid
export const CardGridItem = withNoopInstall(cardGridItem)
