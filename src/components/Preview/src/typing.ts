export interface PreviewOptions {
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

export interface BasicProps {
  show: boolean
  instance: Props
  imageList: string[]
  index: number
  scaleStep: number
  defaultWidth: number
  maskClosable: boolean
  rememberState: boolean
}

export interface ImgState {
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
