import { isString } from '@/utils/is'
import { RenderQrCodeParams, LogoType } from './typing'

export const drawLogo = ({ canvas, logo }: RenderQrCodeParams) => {
  if (!logo) {
    return new Promise((resolve) => {
      resolve((canvas as HTMLCanvasElement).toDataURL())
    })
  }
  const canvasWidth = (canvas as HTMLCanvasElement).width
  const {
    logoSize = 0.15,
    bgColor = '#ffffff',
    borderSize = 0.05,
    crossOrigin,
    borderRadius = 8,
    logoRadius = 0,
  } = logo as LogoType

  const logoSrc: string = isString(logo) ? logo : logo.src
  const logoWidth = canvasWidth * logoSize
  const logoXY = (canvasWidth * (1 - logoSize)) / 2
  const logoBgWidth = canvasWidth * (logoSize + borderSize)
  const logoBgXY = (canvasWidth * (1 - logoSize - borderSize)) / 2

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // logo bg
  canvasRoundRect(ctx)(logoBgXY, logoBgXY, logoBgWidth, logoBgWidth, borderRadius)
  ctx.fillStyle = bgColor
  ctx.fill()

  // logo
  const image = new Image()
  if (crossOrigin || logoRadius) {
    image.setAttribute('crossOrigin', crossOrigin || 'anonymous')
  }
  image.src = logoSrc

  // Using image drawing can avoid some cross-domain situations
  const drawLogoWithImage = (image: CanvasImageSource) => {
    ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)
  }

  // Draw with canvas for more functionality
  const drawLogoWithCanvas = (image: HTMLImageElement) => {
    const canvasImage = document.createElement('canvas')
    canvasImage.width = logoXY + logoWidth
    canvasImage.height = logoXY + logoWidth
    const imageCanvas = canvasImage.getContext('2d')
    if (!imageCanvas || !ctx) return
    imageCanvas.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)

    canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoRadius)
    if (!ctx) return
    const fillStyle = ctx.createPattern(canvasImage, 'no-repeat')
    if (fillStyle) {
      ctx.fillStyle = fillStyle
      ctx.fill()
    }
  }

  return new Promise((resolve) => {
    image.onload = () => {
      logoRadius ? drawLogoWithCanvas(image) : drawLogoWithImage(image)
      try {
        resolve((canvas as HTMLCanvasElement).toDataURL())
      } catch (error) {
        // Maybe it's cross domain
        resolve(null)
      }
    }
  })
}

// draw rounded corners
function canvasRoundRect(ctx: CanvasRenderingContext2D) {
  return (x: number, y: number, w: number, h: number, r: number) => {
    const minSize = Math.min(w, h)
    if (r > minSize / 2) {
      r = minSize / 2
    }
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
    return ctx
  }
}
