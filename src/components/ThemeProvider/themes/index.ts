import { Theme, ThemeOptions, createTheme } from '@mui/material/styles'

import { darkTheme } from './dark'
import { lightTheme } from './light'

const themeMap: { [key: string]: ThemeOptions } = {
  light: lightTheme,
  dark: darkTheme,
}

export const getThemeByName = (name: string): Theme => {
  return createTheme(themeMap[name])
}
