import React, { useState, useMemo, useCallback, createContext, ReactElement, FC, useContext } from 'react'
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { getThemeByName } from './themes'
import { setCookie, getCookie } from '../../utils'

type ThemeName = 'dark' | 'light'
type ThemeProviderProps = {
  setTheme: (theme: ThemeName | ((theme: ThemeName) => ThemeName)) => void
  theme: ThemeName
}

export const ThemeContext = createContext<ThemeProviderProps>({
  setTheme: (name): void => {
    void name
    throw new Error('ThemeContext not initialized')
  },
  theme: 'light',
})

const initialTheme = (getCookie('theme') || 'dark') as ThemeName

export const ThemeProvider: FC<{ children: ReactElement }> = ({ children }): ReactElement => {
  const [themeName, _setThemeName] = useState<ThemeName>(initialTheme)
  const theme = useMemo(() => getThemeByName(themeName), [themeName])

  const setThemeName = useCallback((_theme: ThemeName | ((theme: ThemeName) => ThemeName)): void => {
    if (typeof _theme === 'function') {
      _setThemeName((old) => {
        const newTheme = _theme(old)
        ;(async () => {
          setCookie('theme', newTheme, 30)
        })()
        return newTheme
      })
    } else {
      ;(async () => {
        setCookie('theme', _theme, 30)
      })()
      _setThemeName(_theme)
    }
  }, [])

  const context = useMemo(() => ({ theme: themeName, setTheme: setThemeName }), [themeName, setThemeName])

  return (
    <ThemeContext.Provider value={context}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  )
}

export const ThemeSwitch: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const handleChange = useCallback(() => {
    setTheme((oldTheme) => (oldTheme === 'light' ? 'dark' : 'light'))
  }, [setTheme])

  return (
    <IconButton sx={{ ml: 1 }} onClick={handleChange} color="inherit">
      {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
