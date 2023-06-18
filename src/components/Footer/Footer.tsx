import React, { FC } from 'react'
import { styled, Box, Container, Grid, Typography, Link } from '@mui/material'
import { GitHub, LinkedIn, Telegram } from '@mui/icons-material'

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
}))
const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}))

export const Footer: FC = () => {
  return (
    <FooterContainer component={'footer'}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <TypographyStyled variant="h6" color="text.primary" gutterBottom>
              Contact
            </TypographyStyled>
            <TypographyStyled variant="body2" color="text.secondary">
              Kyiv, UA
            </TypographyStyled>
            <TypographyStyled variant="body2" color="text.secondary">
              Email: tarasgsheva@gmail.com
            </TypographyStyled>
            <TypographyStyled variant="body2" color="text.secondary">
              Phone: +38 068 000 30 90
            </TypographyStyled>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TypographyStyled variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </TypographyStyled>
            <Link href="https://github.com/TarasGShevchenko" color="inherit">
              <GitHub />
            </Link>
            <Link href="https://www.linkedin.com/in/tarasgsheva/" color="inherit" sx={{ pl: 1, pr: 1 }}>
              <LinkedIn />
            </Link>
            <Link href="https://t.me/tgsheva" color="inherit">
              <Telegram />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <TypographyStyled variant="body2" color="text.secondary" align="center">
            {`Copyright © Crypto Tracker ${new Date().getFullYear()}`}
          </TypographyStyled>
        </Box>
      </Container>
    </FooterContainer>
  )
}
