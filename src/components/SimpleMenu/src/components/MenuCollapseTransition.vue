<template>
  <transition
    mode="out-in"
    v-on="on">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuCollapseTransition',
  setup() {
    return {
      on: {
        beforeEnter(el:HTMLElement) {
          el.classList.add('collapse-transition')
          // if (!el.dataset) el.dataset = {}

          el.dataset.oldPaddingTop = el.style.paddingTop
          el.dataset.oldPaddingBottom = el.style.paddingBottom

          el.style.height = '0'
          el.style.paddingTop = '0'
          el.style.paddingBottom = '0'
        },

        enter(el:HTMLElement) {
          el.dataset.oldOverflow = el.style.overflow
          if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px'
            el.style.paddingTop = el.dataset.oldPaddingTop || ''
            el.style.paddingBottom = el.dataset.oldPaddingBottom || ''
          } else {
            el.style.height = ''
            el.style.paddingTop = el.dataset.oldPaddingTop || ''
            el.style.paddingBottom = el.dataset.oldPaddingBottom || ''
          }

          el.style.overflow = 'hidden'
        },

        afterEnter(el:HTMLElement) {
          el.classList.remove('collapse-transition')
          el.style.height = ''
          el.style.overflow = el.dataset.oldOverflow || ''
        },

        beforeLeave(el:HTMLElement) {
          // if (!el.dataset) el.dataset = {}
          el.dataset.oldPaddingTop = el.style.paddingTop
          el.dataset.oldPaddingBottom = el.style.paddingBottom
          el.dataset.oldOverflow = el.style.overflow

          el.style.height = el.scrollHeight + 'px'
          el.style.overflow = 'hidden'
        },

        leave(el:HTMLElement) {
          if (el.scrollHeight !== 0) {
            el.classList.add('collapse-transition')
            el.style.height = '0'
            el.style.paddingTop = '0'
            el.style.paddingBottom = '0'
          }
        },

        afterLeave(el:HTMLElement) {
          el.classList.remove('collapse-transition')
          el.style.height = ''
          el.style.overflow = el.dataset.oldOverflow || ''
          el.style.paddingTop = el.dataset.oldPaddingTop || ''
          el.style.paddingBottom = el.dataset.oldPaddingBottom || ''
        },
      },
    }
  },
})
</script>
