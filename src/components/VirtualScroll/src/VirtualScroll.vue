<script lang="tsx">
import type { CSSProperties, Slot } from 'vue'

import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, reactive, ref, unref, watch } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

type NOS = PropType<string | number | undefined>

export default defineComponent({
  name: 'VirtualScroll',
  props: {
    /**
     * 滚动框高度
     * 支持数字或 px、% 等单位
     */
    height: [Number, String] as NOS,
    /**
     * 滚动框宽度
     * 支持数字或 px、% 等单位
     */
    width: [Number, String] as NOS,
    /**
     * 单个项目的高度
     */
    itemHeight: {
      type: Number,
      required: true,
    },
    /**
     * 所有项目数据
     */
    listData: {
      type: Array as PropType<Recordable[]>,
      default: () => [],
    },
    /**
     * 预加载条数
     */
    bench: {
      type: Number,
      default: 0,
    },
    /**
     * 滚动框最大高度
     * 填写了高度则不需要填写，支持数字或 px、% 等单位
     */
    maxHeight: [Number, String] as NOS,
    /**
     * 滚动框最小高度
     * 填写了高度则不需要填写，支持数字或 px、% 等单位
     */
    minHeight: [Number, String] as NOS,
    /**
     * 滚动框最大宽度
     * 填写了宽度则不需要填写，支持数字或 px、% 等单位
     */
    maxWidth: [Number, String] as NOS,
    /**
     * 滚动框最小宽度
     * 填写了宽度则不需要填写，支持数字或 px、% 等单位
     */
    minWidth: [Number, String] as NOS,
  },
  setup(props, { slots }) {
    const wrapElRef = ref<HTMLDivElement | null>(null)
    const state = reactive({
      first: 0,
      last: 0,
      scrollTop: 0,
    })

    const { prefixCls } = useDesign('virtual-scroll')

    /**
     * 获取预加载数量
     */
    const getBenchRef = computed(() => {
      return Number.parseInt(props.bench, 10)
    })
    /**
     * 获取单个数据项的高度
     */
    const getItemHeightRef = computed(() => {
      return Number.parseInt(props.itemHeight, 10)
    })
    /**
     * 获取渲染的第一条数据条目位置
     */
    const getFirstToRenderRef = computed(() => {
      return Math.max(0, state.first - unref(getBenchRef))
    })
    /**
     * 获取渲染的最后一条数据条目位置
     */
    const getLastToRenderRef = computed(() => {
      return Math.min((props.listData || []).length, state.last + unref(getBenchRef))
    })
    /**
     * 设置滚动框容器的高度
     */
    const getContainerStyleRef = computed((): CSSProperties => {
      return {
        height: convertToUnit((props.listData || []).length * unref(getItemHeightRef)),
      }
    })
    /**
     * 设置滚动框的宽度、高度
     */
    const getWrapStyleRef = computed((): CSSProperties => {
      const styles: Recordable<string> = {}
      const height = convertToUnit(props.height)
      const minHeight = convertToUnit(props.minHeight)
      const minWidth = convertToUnit(props.minWidth)
      const maxHeight = convertToUnit(props.maxHeight)
      const maxWidth = convertToUnit(props.maxWidth)
      const width = convertToUnit(props.width)

      if (height) {
        styles.height = height
      }
      if (minHeight) {
        styles.minHeight = minHeight
      }
      if (minWidth) {
        styles.minWidth = minWidth
      }
      if (maxHeight) {
        styles.maxHeight = maxHeight
      }
      if (maxWidth) {
        styles.maxWidth = maxWidth
      }
      if (width) {
        styles.width = width
      }
      return styles
    })

    /**
     * 转化为合法CSS单位
     */
    function convertToUnit(str: string | number | null | undefined, unit = 'px'): string | undefined {
      if (str == null || str === '') {
        return undefined
      }
      else if (Number.isNaN(+str!)) {
        return String(str)
      }
      else {
        return `${Number(str)}${unit}`
      }
    }

    /**
     * 获取最后一条数据项位置
     */
    function getLast(first: number): number {
      const wrapEl = unref(wrapElRef)
      if (!wrapEl) {
        return 0
      }
      const height = Number.parseInt(props.height || 0, 10) || wrapEl.clientHeight

      return first + Math.ceil(height / unref(getItemHeightRef))
    }

    /**
     * 获取第一条数据项位置
     */
    function getFirst(): number {
      return Math.floor(state.scrollTop / unref(getItemHeightRef))
    }

    /**
     * 处理滚动变化
     */
    function onScroll() {
      const wrapEl = unref(wrapElRef)
      if (!wrapEl) {
        return
      }
      state.scrollTop = wrapEl.scrollTop
      state.first = getFirst()
      state.last = getLast(state.first)
    }

    /**
     * 渲染可见范围数据项
     */
    function renderChildren() {
      const { listData = [] } = props
      return listData.slice(unref(getFirstToRenderRef), unref(getLastToRenderRef)).map(genChild)
    }

    /**
     * 渲染指定数据项
     */
    function genChild(item: any, index: number) {
      index += unref(getFirstToRenderRef)

      const height = convertToUnit(unref(getItemHeightRef))
      const top = convertToUnit(index * unref(getItemHeightRef))
      const slotFn = slots.default as Slot
      return (
        <div class={`${prefixCls}__item`} style={{ top, height }} key={index}>
          {{ default: () => slotFn({ index, item }) }}
        </div>
      )
    }

    watch([() => props.itemHeight, () => props.height], () => {
      onScroll()
    })

    // 监听滚动
    onMounted(() => {
      state.last = getLast(0)
      nextTick(() => {
        const wrapEl = unref(wrapElRef)
        if (!wrapEl) {
          return
        }
        wrapEl.addEventListener('scroll', onScroll)
      })
    })

    // 移除滚动监听
    onBeforeUnmount(() => {
      nextTick(() => {
        const wrapEl = unref(wrapElRef)
        if (!wrapEl) {
          return
        }
        wrapEl.removeEventListener('scroll', onScroll)
      })
    })

    return () => (
      <div class={prefixCls} style={unref(getWrapStyleRef)} ref={wrapElRef}>
        <div class={`${prefixCls}__container`} style={unref(getContainerStyleRef)}>
          {renderChildren()}
        </div>
      </div>
    )
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-virtual-scroll';

.#{$prefix-cls} {
  position: relative;
  display: block;
  flex: 1 1 auto;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  line-height: 1;

  &__container {
    display: block;
  }

  &__item {
    position: absolute;
    right: 0;
    left: 0;
  }
}
</style>
