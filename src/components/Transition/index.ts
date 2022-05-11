import { createSimpleTransition, createJavascriptTransition, createExpandFunc } from './src/Transition'

// Fade
export const FadeTransition = createSimpleTransition('fade')
export const FadeSlideTransition = createSimpleTransition('fade-slide')
export const FadeBottomTransition = createSimpleTransition('fade-bottom')
export const FadeScaleTransition = createSimpleTransition('fade-scale')
export const FadeTopTransition = createSimpleTransition('fade-top')

// Scale
export const ScaleTransition = createSimpleTransition('scale')
export const ScaleRotateTransition = createSimpleTransition('scale-rotate')

// Slide
export const SlideTransition = createSimpleTransition('slide')
export const SlideXTransition = createSimpleTransition('slide-x')
export const SlideReverseTransition = createSimpleTransition('slide-reverse')
export const SlideXReverseTransition = createSimpleTransition('slide-x-reverse')

// Scroll
export const ScrollTransition = createSimpleTransition('scroll')
export const ScrollXTransition = createSimpleTransition('scroll-x')
export const ScrollReverseTransition = createSimpleTransition('scroll-reverse')
export const ScrollXReverseTransition = createSimpleTransition('scroll-x-reverse')

// Zoom
export const ZoomFadeTransition = createSimpleTransition('zoom-fade')
export const ZoomOutTransition = createSimpleTransition('zoom-out')

// JS 方式创建

// Expand
export const ExpandTransition = createJavascriptTransition('expand', createExpandFunc())
export const ExpandXTransition = createJavascriptTransition('expand-x', createExpandFunc(true))
