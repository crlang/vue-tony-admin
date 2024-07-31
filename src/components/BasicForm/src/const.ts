import componentSetting from '@/settings/componentSetting'

const { form } = componentSetting

/**
 * 满行的大小
 */
export const BASIC_COL_LEN = form.fullColumnSize

/**
 * 默认单行显示的个数
 */
export const BASIC_COL_NUM = form.defaultItemSize

/**
 * 默认列的大小，根据计算所得
 */
export const BASIC_COL_SIZE = BASIC_COL_LEN / BASIC_COL_NUM

/**
 * 列间隔大小(px)
 */
export const BASIC_ROW_GUTTER = form.defaultItemGutter
