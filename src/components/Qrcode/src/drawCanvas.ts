import type { QRCodeRenderersOptions } from 'qrcode'
import type { RenderQrCodeParams, ContentType } from './typing'

import { toCanvas } from 'qrcode'

export const renderQrCode = ({
  canvas,
  content,
  width = 0,
  options: params = {},
}: RenderQrCodeParams) => {
  const options = JSON.parse(JSON.stringify(params))
  // Error tolerance rate. By default, high error tolerance rate is used for QR codes with less content, and low error tolerance rate is used for QR codes with more content.
  options.errorCorrectionLevel = options.errorCorrectionLevel || getErrorCorrectionLevel(content)

  return getOriginWidth(content, options).then((_width: number) => {
    options.scale = width === 0 ? undefined : (width / _width) * 4
    return toCanvas(canvas, content, options)
  })
}

// Get the size of the original QrCode so that you can zoom to get the correct QrCode size
function getOriginWidth(content: ContentType, options: QRCodeRenderersOptions) {
  const _canvas = document.createElement('canvas')
  return toCanvas(_canvas, content, options).then(() => _canvas.width)
}

// For QrCode with less content, increase the fault tolerance rate
function getErrorCorrectionLevel(content: ContentType) {
  if (content.length > 36) {
    return 'M'
  } else if (content.length > 16) {
    return 'Q'
  } else {
    return 'H'
  }
}
