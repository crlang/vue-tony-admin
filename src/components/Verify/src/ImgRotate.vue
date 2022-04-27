<script lang="tsx">
import type { MoveData, DragVerifyActionType } from './typing'

import { defineComponent, computed, unref, reactive, watch, ref } from 'vue'
import { useTimeoutFn } from '@/hooks/core/useTimeout'
import BasicDragVerify from './DragVerify.vue'
import { hackCss } from '@/utils/domUtils'
import { rotateProps } from './props'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ImgRotateDragVerify',
  inheritAttrs: false,
  props: rotateProps,
  emits: ['success', 'change', 'update:modelValue'],
  setup(props, { emit, attrs, expose }) {
    const basicRef = ref<Nullable<DragVerifyActionType>>(null)
    const state = reactive({
      showTip: false,
      isPassing: false,
      imgStyle: {},
      randomRotate: 0,
      currentRotate: 0,
      toOrigin: false,
      startTime: 0,
      endTime: 0,
      draged: false,
    })
    const { prefixCls } = useDesign('basic-img-verify')

    watch(
      () => state.isPassing,
      (isPassing) => {
        if (isPassing) {
          const { startTime, endTime } = state
          const time = (endTime - startTime) / 1000
          emit('success', { isPassing, time: time.toFixed(1) })
          emit('change', isPassing)
          emit('update:modelValue', isPassing)
        }
      }
    )

    const getImgWrapStyleRef = computed(() => {
      const { imgWrapStyle, imgSize } = props
      return {
        width: `${imgSize}px`,
        height: `${imgSize}px`,
        ...imgWrapStyle,
      }
    })

    const getFactorRef = computed(() => {
      const { minDegree, maxDegree } = props
      if (minDegree === maxDegree) {
        return Math.floor(1 + Math.random() * 1) / 10 + 1
      }
      return 1
    })
    function handleStart() {
      state.startTime = new Date().getTime()
    }

    function handleDragBarMove(data: MoveData) {
      state.draged = true
      const { imgSize, height, maxDegree } = props
      const { moveX } = data
      const currentRotate = Math.ceil(
        (moveX / (imgSize! - height)) * maxDegree! * unref(getFactorRef)
      )
      state.currentRotate = currentRotate
      state.imgStyle = hackCss('transform', `rotateZ(${state.randomRotate - currentRotate}deg)`)
    }

    function handleImgOnLoad() {
      const { minDegree, maxDegree } = props
      // Generate random angles
      const ranRotate = Math.floor(minDegree! + Math.random() * (maxDegree! - minDegree!))
      state.randomRotate = ranRotate
      state.imgStyle = hackCss('transform', `rotateZ(${ranRotate}deg)`)
    }

    function handleDragEnd() {
      const { randomRotate, currentRotate } = state
      const { diffDegree } = props

      if (Math.abs(randomRotate - currentRotate) >= (diffDegree || 20)) {
        state.imgStyle = hackCss('transform', `rotateZ(${randomRotate}deg)`)
        state.toOrigin = true
        useTimeoutFn(() => {
          state.toOrigin = false
          state.showTip = true
          //  The time is the same as the animation time
        }, 300)
      } else {
        checkPass()
      }
      state.showTip = true
    }
    function checkPass() {
      state.isPassing = true
      state.endTime = new Date().getTime()
    }

    function resume() {
      state.showTip = false
      const basicEl = unref(basicRef)
      if (!basicEl) {
        return
      }
      state.isPassing = false

      basicEl.resume()
      handleImgOnLoad()
    }

    expose({ resume })

    // handleImgOnLoad();
    return () => {
      const { src } = props
      const { toOrigin, isPassing, startTime, endTime } = state
      const imgCls: string[] = []
      if (toOrigin) {
        imgCls.push('to-origin')
      }
      const time = (endTime - startTime) / 1000

      return (
        <div class={`${prefixCls}`}>
          <div class={`${prefixCls}-img__wrap`} style={unref(getImgWrapStyleRef)}>
            <img
              src={src}
              onLoad={handleImgOnLoad}
              width={props.width}
              class={imgCls}
              style={state.imgStyle}
              onClick={() => {
                resume()
              }}
              alt='verify' />
            {state.showTip && (
              <span class={[`${prefixCls}-img__tip`, state.isPassing ? 'success' : 'error']}>
                {state.isPassing
                  ? `验证校验成功,耗时${time.toFixed(1)}秒！`
                  : '验证失败！'}
              </span>
            )}
            {!state.showTip && !state.draged && (
              <span class={[`${prefixCls}-img__tip`, 'normal']}>{'点击图片可刷新'}</span>
            )}
          </div>
          <BasicDragVerify
            class={`${prefixCls}-drag__bar`}
            onMove={handleDragBarMove}
            onEnd={handleDragEnd}
            onStart={handleStart}
            ref={basicRef}
            {...{ ...attrs, ...props }}
            modelValue={isPassing}
            isSlot={true} />
        </div>
      )
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-img-verify';

.#{$prefix-cls} {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-img__wrap {
    position: relative;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      border-radius: 50%;

      &.to-origin {
        transition: transform 0.3s;
      }
    }
  }

  &-img__tip {
    position: absolute;
    bottom: 10px;
    left: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    user-select: none;

    &.success {
      background-color: var(--success-color);
    }

    &.error {
      background-color: var(--error-color);
    }

    &.normal {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  &-drag__bar {
    margin-top: 20px;
    user-select: none;
  }
}
</style>
