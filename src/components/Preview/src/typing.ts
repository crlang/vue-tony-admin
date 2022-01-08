export interface Options {
  show?: boolean
  imageList: string[]
  index?: number
  scaleStep?: number
  defaultWidth?: number
  maskClosable?: boolean
  rememberState?: boolean
  onImgLoad?: ({ index: number, url: string, dom: HTMLImageElement }) => void
  onImgError?: ({ index: number, url: string, dom: HTMLImageElement }) => void
}

export interface Props {
  show: boolean
  instance: Props
  imageList: string[]
  index: number
  scaleStep: number
  defaultWidth: number
  maskClosable: boolean
  rememberState: boolean
}
