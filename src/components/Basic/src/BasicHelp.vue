<script lang="tsx">
import type { UsePopperCoreConfigProps } from 'element-plus'

import { defineComponent } from 'vue'
import { InfoFilled } from '@element-plus/icons'
import { isArray, isString } from '@/utils/is'
import { getSlot } from '@/utils/helper/tsxHelper'
import { useDesign } from '@/hooks/web/useDesign'
import { ElTooltip } from 'element-plus'
import { GlobalThemeType } from '@/utils/types'

export default defineComponent({
  name: 'BasicHelp',
  components: { InfoFilled },
  props: {
  /**
   * Whether to display the serial number
   */
    showIndex: { type: Boolean },
    /**
   * Help theme
   */
    effect: { type: String as PropType<GlobalThemeType>, default: 'dark' },
    /**
     * Help text direction
     */
    placement: { type: String as PropType<UsePopperCoreConfigProps['placement']>, default: 'right' },
    /**
   * Help text content
   */
    text: { type: [Array, String] as PropType<string[] | string> },
  },
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
          effect={props.effect}
          placement={props.placement} >
          {{
            content: () => renderTitle(),
            default: () => <span class={prefixCls}>{getSlot(slots) || <InfoFilled />}</span>,
          }}
        </ElTooltip>
      )
    }
  },
})
</script>

<style lang="scss">
  $prefix-cls: '#{$tonyname}-basic-help';

  .#{$prefix-cls} {
    display: inline-block;
    margin-left: 6px;
    font-size: 0.875rem;
    color: var(--text-secondary-color);
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }

    &__wrap {
      p {
        margin-bottom: 0;
      }
    }
  }
</style>
