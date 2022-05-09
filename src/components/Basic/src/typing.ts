import { UsePopperCoreConfigProps } from 'element-plus'

export type ArrowDirection = 'up' | 'down' | 'left' | 'right'

export interface BasicArrowTyping {
  /**
   * Arrow expand state
   */
  expand: boolean
  /**
   * Arrow direction
   */
  direction: ArrowDirection
}

export interface BasicHelpTyping {
  /**
   * Whether to display the serial number
   */
  showIndex:boolean
  /**
   * Help theme
   */
  effect: ThemeType
  /**
   * Help text direction
   */
  placement: UsePopperCoreConfigProps['placement']
  /**
   * Help text content
   */
  text: string | string[]
}

export interface BasicTitleTyping {
  /**
   * Prompt text or text array
   */
  helpMessage: string | string[]
  /**
   * Whether to show the color block to the left of the title
   */
  span: boolean
  /**
   * Whether the title is bold
   */
  bold: boolean
}
