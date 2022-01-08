<script lang="tsx">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { InfoFilled } from '@element-plus/icons'
import { isArray, isString } from '@/utils/is'
import { getSlot } from '@/utils/helper/tsxHelper'
import { useDesign } from '@/hooks/web/useDesign'
import { ElTooltip } from 'element-plus'
import { effectTypes } from './typing'

const props = {
  /**
   * Whether to display the serial number
   * @default: false
   */
  showIndex: { type: Boolean },
  /**
   * Help text font color
   * @default: #ffffff
   */
  effect: { type: String as PropType<effectTypes>, default: 'dark' },
  /**
     * Help text direction
     */
  placement: { type: String, default: 'right' },
  /**
   * Help text content
   */
  text: { type: [Array, String] as PropType<string[] | string> },
}

export default defineComponent({
  name: 'BasicHelp',
  components: { InfoFilled },
  props,
  setup(props, { slots }) {
    const { prefixCls } = useDesign('basic-help')

    function renderTitle() {
      const textList = props.text || ''

      if (isString(textList)) {
        return textList
      }

      if (isArray(textList)) {
        return textList.map((text, index) => {
          return (
            <p key={text}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {text}
              </>
            </p>
          )
        })
      }
      return null
    }

    return () => {
      return (
        <ElTooltip
          popper-class={`${prefixCls}__wrap`}
          placement={props.placement as 'right'} >
          {{
            content: () => renderTitle(),
            default: () => <span class={prefixCls}>{getSlot(slots) || <InfoFilled style='width: 1em; height: 1em;' />}</span>,
          }}
        </ElTooltip>
      )
    }
  },
})
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-basic-help';

  .#{$prefix-cls} {
    display: inline-block;
    margin-left: 6px;
    font-size: 14px;
    color: $text-color-help-dark;
    cursor: pointer;

    &:hover {
      color: $primary-color;
    }

    &__wrap {
      p {
        margin-bottom: 0;
      }
    }
  }
</style>
