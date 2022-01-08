import colors from 'windicss/colors'
import { defineConfig } from 'vite-plugin-windicss'
import { primaryColor } from './build/config/themeConfig'

export default defineConfig({
  darkMode: 'class',
  plugins: [],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      colors: {
        ...colors,
        primary: primaryColor,
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
    },
  },
})
