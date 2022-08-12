export const primaryColor = '#0081FF'

type Fn = (...arg: any) => any

export interface GenerateColorsParams {
  mixLighten: Fn
  mixDarken: Fn
  tinycolor: Fn
  color?: string
}

export function generateColors({ color = primaryColor, mixLighten, mixDarken, tinycolor }: GenerateColorsParams) {
  const arr = new Array(19).fill(0)
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5)
  })

  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5)
  })

  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString()
  })

  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'))

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#ffffff')

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#000000')
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'))
}
