## CardGrid

### vue

```html
<TyCardGrid header="card title" center :rows="3">
  <TyCardGridItem vertical>内容</TyCardGridItem>
</TyCardGrid>
```

### ts

```ts
import { CardGrid } from '@/components/CardGrid'

// 声明组件
export default defineComponent({
  components: { TyCardGrid, TyCardGridItem }
})
```

### guide

#### TyCardGrid

| Property | Description                 | Type               | Default | Version |
| -------- | --------------------------- | ------------------ | ------- | ------- |
| header   | 卡片头部标题                | `string` \| `slot` | `-`     |         |
| center   | 内容项是否居中显示          | `bool`             | `false` |         |
| rows     | 每行显示数量，最大值支持 20 | `number`           | `3`     |         |

#### TyCardGridItem

| Property | Description                                            | Type   | Default | Version |
| -------- | ------------------------------------------------------ | ------ | ------- | ------- |
| vertical | 内容项居中方向。仅 TyCardGrid 的 center 为 true 时生效 | `bool` | `false` |         |

### example

```html
<TyCardGrid>
  <template #header>card header title</template>
  <TyCardGridItem v-for="item in gridItems" :key="item">{{ item.title }}</TyCardGridItem>
</TyCardGrid>
```
