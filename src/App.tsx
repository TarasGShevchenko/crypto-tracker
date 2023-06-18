import React from 'react'
import { styled } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CryptoTable } from './components/CryptoTable'
import { Wallet } from './components/Wallet'
import { Chart } from './components/Chart'

const AppContainer = styled('div')(() => ({
  textAlign: 'center',
  display: 'grid',
  height: '100vh',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: ['header', 'main', 'footer'],
}))

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path={'/'} element={<CryptoTable />} />
          <Route path={'/wallet'} element={<Wallet />} />
          <Route path={'/chart/:id'} element={<Chart />} />
        </Routes>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  )
}

export default App
