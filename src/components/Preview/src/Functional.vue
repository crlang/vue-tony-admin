<script lang="tsx">
import { defineComponent, ref, unref, computed, reactive, watchEffect } from 'vue'
import { Close, ArrowLeft, ArrowRight } from '@element-plus/icons'
import resumeSvg from '@/assets/svg/preview/resume.svg'
import rotateSvg from '@/assets/svg/preview/p-rotate.svg'
import scaleSvg from '@/assets/svg/preview/scale.svg'
import unScaleSvg from '@/assets/svg/preview/unscale.svg'
import unRotateSvg from '@/assets/svg/preview/unrotate.svg'

enum StatueEnum {
  LOADING,
  DONE,
  FAIL,
}
interface ImgState {
  currentUrl: string;
  imgScale: number;
  imgRotate: number;
  imgTop: number;
  imgLeft: number;
  currentIndex: number;
  status: StatueEnum;
  moveX: number;
  moveY: number;
  show: boolean;
}
const props = {
  show: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  imageList: {
    type: [Array] as PropType<string[]>,
    default: null,
  },
  index: {
    type: Number as PropType<number>,
    default: 0,
  },
  scaleStep: {
    type: Number as PropType<number>,
  },
  defaultWidth: {
    type: Number as PropType<number>,
  },
  maskClosable: {
    type: Boolean as PropType<boolean>,
  },
  rememberState: {
    type: Boolean as PropType<boolean>,
  },
}

const prefixCls = 'img-preview'
export default defineComponent({
  name: 'ImagePreview',
  props,
  emits: ['img-load', 'img-error'],
  setup(props, { expose, emit }) {
    interface stateInfo {
      scale: number;
      rotate: number;
      top: number;
      left: number;
    }
    const stateMap = new Map<string, stateInfo>()
    const imgState = reactive<ImgState>({
      currentUrl: '',
      imgScale: 1,
      imgRotate: 0,
      imgTop: 0,
      imgLeft: 0,
      status: StatueEnum.LOADING,
      currentIndex: 0,
      moveX: 0,
      moveY: 0,
      show: props.show,
    })

    const wrapElRef = ref<HTMLDivElement | null>(null)
    const imgElRef = ref<HTMLImageElement | null>(null)

    function init() {
      initMouseWheel()
      const { index, imageList } = props

      if (!imageList || !imageList.length) {
        throw new Error('imageList is undefined')
      }
      imgState.currentIndex = index
      handleIChangeImage(imageList[index])
    }

    function initState() {
      imgState.imgScale = 1
      imgState.imgRotate = 0
      imgState.imgTop = 0
      imgState.imgLeft = 0
    }

    function initMouseWheel() {
      const wrapEl = unref(wrapElRef)
      if (!wrapEl) {
        return
      }
      (wrapEl as any).onmousewheel = scrollFn
      // Firefox has no onmousewheel event, use DOMMouseScroll instead
      document.body.addEventListener('DOMMouseScroll', scrollFn)
      // Disable the default event of dragging images in Firefox
      document.ondragstart = function () {
        return false
      }
    }

    const getScaleStep = computed(() => {
      const scaleStep = props?.scaleStep ?? 0
      if (scaleStep ?? (scaleStep < 100)) {
        return scaleStep / 100
      } else {
        return imgState.imgScale / 10
      }
    })

    function scrollFn(e: any) {
      e = e || window.event
      e.delta = e.wheelDelta || -e.detail

      e.preventDefault()
      if (e.delta > 0) {
        // Up
        scaleFn(getScaleStep.value)
      }
      if (e.delta < 0) {
        // Down
        scaleFn(-getScaleStep.value)
      }
    }
    function scaleFn(num: number) {
      if (imgState.imgScale <= 0.2 && num < 0) return
      imgState.imgScale += num
    }

    function rotateFn(deg: number) {
      imgState.imgRotate += deg
    }

    function handleMouseUp() {
      const imgEl = unref(imgElRef)
      if (!imgEl) return
      imgEl.onmousemove = null
    }

    function handleIChangeImage(url: string) {
      imgState.status = StatueEnum.LOADING
      const img = new Image()
      img.src = url
      img.onload = (e: Event) => {
        if (imgState.currentUrl !== url) {
          const ele: any[] = e.composedPath()
          if (props.rememberState) {
            stateMap.set(imgState.currentUrl, {
              scale: imgState.imgScale,
              top: imgState.imgTop,
              left: imgState.imgLeft,
              rotate: imgState.imgRotate,
            })
            const stateInfo = stateMap.get(url)
            if (stateInfo) {
              imgState.imgScale = stateInfo.scale
              imgState.imgTop = stateInfo.top
              imgState.imgRotate = stateInfo.rotate
              imgState.imgLeft = stateInfo.left
            } else {
              initState()
              if (props.defaultWidth) {
                imgState.imgScale = props.defaultWidth / ele[0].naturalWidth
              }
            }
          } else {
            if (props.defaultWidth) {
              imgState.imgScale = props.defaultWidth / ele[0].naturalWidth
            }
          }

          ele &&
              emit('img-load', {
                index: imgState.currentIndex,
                dom: ele[0] as HTMLImageElement,
                url,
              })
        }
        imgState.currentUrl = url
        imgState.status = StatueEnum.DONE
      }
      img.onerror = (e: Event) => {
        const ele: EventTarget[] = e.composedPath()
        ele &&
            emit('img-error', {
              index: imgState.currentIndex,
              dom: ele[0] as HTMLImageElement,
              url,
            })
        imgState.status = StatueEnum.FAIL
      }
    }

    function handleClose(e: MouseEvent) {
      e && e.stopPropagation()
      close()
    }

    function close() {
      imgState.show = false
      // Remove mouse scroll event under Firefox
      document.body.removeEventListener('DOMMouseScroll', scrollFn)
      // Restore drag and drop images in Firefox and Safari browsers
      document.ondragstart = null
    }

    function resume() {
      initState()
    }

    expose({
      resume,
      close,
      prev: handleChange.bind(null, 'left'),
      next: handleChange.bind(null, 'right'),
      setScale: (scale: number) => {
        if (scale > 0 && scale <= 10) imgState.imgScale = scale
      },
      setRotate: (rotate: number) => {
        imgState.imgRotate = rotate
      },
    })

    function handleChange(direction: 'left' | 'right') {
      const { currentIndex } = imgState
      const { imageList } = props
      if (direction === 'left') {
        imgState.currentIndex--
        if (currentIndex <= 0) {
          imgState.currentIndex = imageList.length - 1
        }
      }
      if (direction === 'right') {
        imgState.currentIndex++
        if (currentIndex >= imageList.length - 1) {
          imgState.currentIndex = 0
        }
      }
      handleIChangeImage(imageList[imgState.currentIndex])
    }

    function handleAddMoveListener(e: MouseEvent) {
      e = e || window.event
      imgState.moveX = e.clientX
      imgState.moveY = e.clientY
      const imgEl = unref(imgElRef)
      if (imgEl) {
        imgEl.onmousemove = moveFn
      }
    }

    function moveFn(e: MouseEvent) {
      e = e || window.event
      e.preventDefault()
      const movementX = e.clientX - imgState.moveX
      const movementY = e.clientY - imgState.moveY
      imgState.imgLeft += movementX
      imgState.imgTop += movementY
      imgState.moveX = e.clientX
      imgState.moveY = e.clientY
    }

    const getImageStyle = computed(() => {
      const { imgScale, imgRotate, imgTop, imgLeft } = imgState
      return {
        transform: `scale(${imgScale}) rotate(${imgRotate}deg)`,
        marginTop: `${imgTop}px`,
        marginLeft: `${imgLeft}px`,
        maxWidth: props.defaultWidth ? 'unset' : '100%',
      }
    })

    const getIsMultipleImage = computed(() => {
      const { imageList } = props
      return imageList.length > 1
    })

    watchEffect(() => {
      if (props.show) {
        init()
      }
      if (props.imageList) {
        initState()
      }
    })

    const handleMaskClick = (e: MouseEvent) => {
      if (
        props.maskClosable &&
          e.target &&
          (e.target as HTMLDivElement).classList.contains(`${prefixCls}-content`)
      ) {
        handleClose(e)
      }
    }

    const renderClose = () => {
      return (
        <div class={`${prefixCls}__close`} onClick={handleClose}>
          <Close class={`${prefixCls}__close-icon`} />
        </div>
      )
    }

    const renderIndex = () => {
      if (!unref(getIsMultipleImage)) {
        return null
      }
      const { currentIndex } = imgState
      const { imageList } = props
      return (
        <div class={`${prefixCls}__index`}>
          {currentIndex + 1} / {imageList.length}
        </div>
      )
    }

    const renderController = () => {
      return (
        <div class={`${prefixCls}__controller`}>
          <div
            class={`${prefixCls}__controller-item`}
            onClick={() => scaleFn(-getScaleStep.value)} >
            <img src={unScaleSvg} />
          </div>
          <div
            class={`${prefixCls}__controller-item`}
            onClick={() => scaleFn(getScaleStep.value)} >
            <img src={scaleSvg} />
          </div>
          <div class={`${prefixCls}__controller-item`} onClick={resume}>
            <img src={resumeSvg} />
          </div>
          <div class={`${prefixCls}__controller-item`} onClick={() => rotateFn(-90)}>
            <img src={unRotateSvg} />
          </div>
          <div class={`${prefixCls}__controller-item`} onClick={() => rotateFn(90)}>
            <img src={rotateSvg} />
          </div>
        </div>
      )
    }

    const renderArrow = (direction: 'left' | 'right') => {
      if (!unref(getIsMultipleImage)) {
        return null
      }
      return (
        <div class={[`${prefixCls}__arrow`, direction]} onClick={() => handleChange(direction)}>
          {direction === 'left' ? <ArrowLeft /> : <ArrowRight />}
        </div>
      )
    }

    return () => {
      return (
        imgState.show && (
          <div
            class={prefixCls}
            ref={wrapElRef}
            onMouseup={handleMouseUp}
            onClick={handleMaskClick} >
            <div class={`${prefixCls}-content`}>
              <img
                style={unref(getImageStyle)}
                class={[
                  `${prefixCls}-image`,
                  imgState.status === StatueEnum.DONE ? '' : 'hidden',
                ]}
                ref={imgElRef}
                src={imgState.currentUrl}
                onMousedown={handleAddMoveListener}
              />
              {renderClose()}
              {renderIndex()}
              {renderController()}
              {renderArrow('left')}
              {renderArrow('right')}
            </div>
          </div>
        )
      )
    }
  },
})
</script>

<style lang="scss">
  .img-preview {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $preview-comp-z-index;
    background: rgba(0, 0, 0, 0.5);
    user-select: none;

    &-content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: var(--white-color);
    }

    &-image {
      cursor: pointer;
      transition: transform 0.3s;
    }

    &__close {
      position: absolute;
      top: -40px;
      right: -40px;
      width: 80px;
      height: 80px;
      overflow: hidden;
      color: var(--white-color);
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      transition: all 0.2s;

      &-icon {
        position: absolute;
        top: 44px;
        right: 42px;
        width: 24px;
        height: 24px;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
    }

    &__index {
      position: absolute;
      bottom: 5%;
      left: 50%;
      padding: 0 22px;
      font-size: 16px;
      background: rgba(109, 109, 109, 0.6);
      border-radius: 15px;
      transform: translateX(-50%);
    }

    &__controller {
      position: absolute;
      bottom: 10%;
      left: 50%;
      display: flex;
      justify-content: center;
      width: 260px;
      height: 44px;
      padding: 0 22px;
      margin-left: -139px;
      background: rgba(109, 109, 109, 0.6);
      border-radius: 22px;

      &-item {
        display: flex;
        height: 100%;
        padding: 0 9px;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.2);
        }

        img {
          width: 1em;
          /* stylelint-disable-next-line scss/no-global-function-names */
          filter: invert(1);
        }
      }
    }

    &__arrow {
      position: absolute;
      top: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      font-size: 28px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      transition: all 0.2s;

      > svg {
        width: 32px;
        height: 32px;
        color: #fff;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }

      &.left {
        left: 50px;
      }

      &.right {
        right: 50px;
      }
    }
  }
</style>
