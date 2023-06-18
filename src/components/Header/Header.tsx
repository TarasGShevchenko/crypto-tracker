import React, { FC } from 'react'
import { AppBar, styled, Link } from '@mui/material'

import { ThemeSwitch } from '../ThemeProvider'

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  padding: 16,
}))
const LogoLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.5,
  cursor: 'pointer',
  textDecoration: 'none',
}))

export const Header: FC = () => {
  return (
    <HeaderContainer position={'static'}>
      <LogoLink href={'/'}>Crypto Tracker</LogoLink>
      <ThemeSwitch />
    </HeaderContainer>
  )
}
