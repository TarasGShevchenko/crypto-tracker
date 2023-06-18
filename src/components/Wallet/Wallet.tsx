import React, { useState } from 'react'
import { ethers } from 'ethers'
import { styled, TextField, FormGroup, Button } from '@mui/material'

// d1eb4546f7644a2eac243590a51b1bed Web3 API Key from INFURA
const infuraUrl = 'https://goerli.infura.io/v3/d1eb4546f7644a2eac243590a51b1bed'

const Container = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))
const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'start',
  color: theme.palette.text.primary,
  maxWidth: 1024,
  margin: '8px auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}))
const WalletElem = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 16,
}))

const WalletTitle = styled('h2')(() => ({
  margin: 8,
}))
const ButtonContainer = styled(Button)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.default,
  margin: '8px auto',
  minWidth: 140,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.text.secondary}`,
  borderRadius: 6,
  fontSize: 12,
}))

const Input = styled(TextField)(({ theme }) => ({
  margin: 8,
  '& label': {
    color: theme.palette.text.secondary,
  },
  '& label.Mui-focused': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.text.secondary,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.secondary,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.text.secondary,
    },
  },
}))

export const Wallet: React.FC = () => {
  const [ethBalance, setEthBalance] = useState('')
  const [address, setAddress] = useState('')
  const [fromAddress, setFromAddress] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleFromAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromAddress(event.target.value)
  }

  const handleToAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToAddress(event.target.value)
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleCheckBalance = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(infuraUrl)
      const balance = await provider.getBalance(fromAddress)
      setEthBalance(ethers.formatEther(balance))
    } catch (error) {
      console.error('Error checking Ethereum balance:', error)
    }
  }

  const handleSendEther = async () => {
    try {
      const privateKey = ''
      const provider = new ethers.JsonRpcProvider(infuraUrl)
      const wallet = new ethers.Wallet(privateKey, provider)

      const transaction = {
        to: toAddress,
        value: ethers.parseEther(amount),
      }

      const tx = await wallet.sendTransaction(transaction)
      console.log('Transaction hash:', tx.hash)
    } catch (error) {
      console.error('Error sending Ether:', error)
    }
  }

  return (
    <Container>
      <Wrapper>
        <WalletElem>
          <WalletTitle>Ethereum Balance Checker</WalletTitle>
          <FormGroup>
            <Input
              fullWidth
              variant={'outlined'}
              id={'address-balance'}
              label={'From Address'}
              type="text"
              value={address}
              onChange={handleAddressChange}
            />
          </FormGroup>
          <ButtonContainer onClick={handleCheckBalance}>Check Balance</ButtonContainer>
          {ethBalance && <p>Ethereum Balance: {ethBalance} ETH</p>}
        </WalletElem>
        <WalletElem>
          <WalletTitle>Ether Transfer</WalletTitle>
          <FormGroup>
            <Input
              fullWidth
              variant={'outlined'}
              id={'form-address'}
              label={'From Address'}
              type="text"
              value={fromAddress}
              onChange={handleFromAddressChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              fullWidth
              variant={'outlined'}
              id={'to-address'}
              label={'To Address'}
              type="text"
              value={toAddress}
              onChange={handleToAddressChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              fullWidth
              variant={'outlined'}
              id={'amount'}
              label={'Amount (ETH)'}
              type="text"
              value={amount}
              onChange={handleAmountChange}
            />
          </FormGroup>
          <ButtonContainer onClick={handleSendEther}>Send Ether</ButtonContainer>
        </WalletElem>
      </Wrapper>
    </Container>
  )
}
