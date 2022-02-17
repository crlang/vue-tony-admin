<template>
  <svg
    v-bind="getCircelValues"
    v-if="show">
    <circle
      v-bind="getBgCricleProps"
      :class="`${prefixCls}__bg`" />
    <circle
      v-bind="getBarCricleProps"
      :class="`${prefixCls}__bar`"
      ref="circleBarRef" />
  </svg>
</template>

<script lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
import { error } from '@/utils/log'
import { computed, CSSProperties, defineComponent, onMounted, ref, SVGAttributes, unref } from 'vue'

export default defineComponent({
  name: 'Progress',
  inheritAttrs: false,
  props: {
    /**
     * Circle size
     */
    size: {
      type: Number,
      default: 32,
    },
    /**
     * Circle bar width
     */
    width: {
      type: Number,
      default: 2,
    },
    /**
     * Progress bar percentage
     */
    progress: {
      type: Number,
      default: 100,
    },
    /**
     * Progress bar color
     */
    color: {
      type: String,
      default: '#22CCE2',
    },
    /**
     * Progress bar background
     */
    background: {
      type: String,
      default: '#EFF4F8',
    },
    /**
     * Whether to turn on animation
     */
    isAnimation: {
      type: Boolean,
      default: true,
    },
    /**
     * Progress bar style(svg stroke-linecap)
     */
    barStyle: {
      type: String as PropType<SVGAttributes['stroke-linecap']>,
      default: 'round',
    },
    /**
     * Progress time duration
     */
    duration: {
      type: Number,
      default: 1000,
    },
    /**
     * Progress time delay
     */
    delay: {
      type: Number,
      default: 200,
    },
    /**
     * Progress time function
     */
    timeFunction: {
      type: String,
      default: 'cubic-bezier(0.99, 0.01, 0.22, 0.94)',
    },
  },
  emits: [],
  setup(props) {
    const circleBarRef = ref()
    const circleBarClass = ref('')
    const show = ref(false)
    const { prefixCls } = useDesign('cricle-progress')

    const getCircelValues = computed(():SVGAttributes => {
      const { isAnimation, width, size, duration, delay, timeFunction, progress } = props
      const style:CSSProperties = {
        'transform': 'rotate(-90deg)',
      }
      const basicOpts = {
        width: size,
        height: size,
        xmlns: 'http://www.w3.org/2000/svg',
        style,
        class: prefixCls,
      }
      // not animation effect
      if (!isAnimation) {
        return basicOpts
      }

      const barWidth = (size - width) * 3.14
      const barProgress = (100 - progress) / 100

      const exStyle = {
        ...style,
        '--bar-duration': duration + 'ms',
        '--bar-delay': delay + 'ms',
        '--bar-func': timeFunction,
        '--bar-start-width': barWidth + 'px',
        '--bar-end-width': (barWidth * barProgress) + 'px',
      }
      return {
        ...basicOpts,
        style: exStyle,
      }
    })

    const getBasicProps = computed(() => {
      const { width, size } = props
      return {
        r: (size - width) / 2,
        cy: size / 2,
        cx: size / 2,
        'stroke-width': width,
        fill: 'none',
      }
    })

    const getBgCricleProps = computed(():SVGAttributes => {
      const { background } = props
      return { ...unref(getBasicProps), stroke: background }
    })

    const getBarCricleProps = computed(():SVGAttributes => {
      const { color, barStyle, isAnimation, size, width, progress } = props
      const barWidth = (size - width) * 3.14
      return {
        ...unref(getBasicProps),
        stroke: color,
        'stroke-linecap': barStyle,
        'stroke-dasharray': barWidth,
        'stroke-dashoffset': isAnimation ? barWidth : barWidth * (100 - progress) / 100,
      }
    })

    function createProgress() {
      const { width, size } = props
      if (width > size) {
        error('Component -> Progerss: width of the circle must be less than size')
      }

      show.value = true
    }

    onMounted(createProgress)

    return {
      prefixCls,
      show,
      getCircelValues,
      getBgCricleProps,
      getBarCricleProps,
      circleBarRef,
      circleBarClass,
    }
  },

})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-cricle-progress';

.#{$prefix-cls} {
  width: auto;
  height: auto;

  &__bar {
    animation: circle_progress_name var(--bar-duration) var(--bar-delay) var(--bar-func) forwards;
  }
}

@keyframes circle_progress_name {
  from {
    stroke-dashoffset: var(--bar-start-width);
  }

  to {
    stroke-dashoffset: var(--bar-end-width);
  }
}

</style>
