import React, { FC, useCallback, useEffect, useState, MouseEvent, ChangeEvent, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { StarRounded, StarOutlineRounded } from '@mui/icons-material'

import { fetchCryptos } from '../../api'
import { CurrencyType, ICrypto } from '../../store/types'
import { TableType } from '../../enums'
import { getLabelCurrency } from '../../utils'
import { addFavoritesAction, removeFavoritesAction, selectCurrencyAction, selectTableAction } from '../../store/actions'
import { currencySelector, favoritesSelector, idsSelector, tableTypeSelector } from '../../store/selectors'

const CryptoContainer = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}))
const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}))
const SearchWrapper = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: 1024,
  width: '100%',
}))
const InputSearch = styled(TextField)(({ theme }) => ({
  margin: 8,
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
const ActionsWrapper = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
  margin: 8,
}))
const ButtonAction = styled(Button)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.default,
  margin: '8px auto',
  minWidth: 140,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.text.secondary}`,
  borderRadius: 6,
  fontSize: 12,
}))
const Select = styled(TextField)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.default,
  margin: '8px auto',
  minWidth: 140,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.text.secondary}`,
  borderRadius: 6,
  '& .MuiInputBase-root': {
    fontSize: 12,
    '& .MuiSelect-select': {
      padding: 8,
    },
  },
}))

const CryptoList = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}))
const TableWrapper = styled('div')(() => ({
  display: 'flex',
  maxWidth: 1024,
  width: '100%',
  margin: 16,
}))
const Progress = styled(CircularProgress)(() => ({
  margin: 16,
}))

const TableHeadStyled = styled(TableHead)(() => ({
  backgroundColor: '#2f81f7',
}))
const TableRowStyled = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}))
const TableCellStyled = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
  padding: 6,
  borderBottom: 'none',
}))
const FavouriteTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: 0,
  width: 40,
  borderBottom: 'none',
}))
const NameTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: 6,
  textAlign: 'center',
  borderBottom: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
const CryptoImage = styled('img')(() => ({
  margin: 4,
  height: 30,
}))

export const CryptoTable: FC = () => {
  const [list, setList] = useState<ICrypto[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currency = useSelector(currencySelector)
  const tableType = useSelector(tableTypeSelector)
  const ids = useSelector(idsSelector)
  const favorites = useSelector(favoritesSelector)

  useEffect(() => {
    setLoading(true)
    fetchCryptos(ids, currency).then((res) => {
      setList(res?.data)
      setLoading(false)
    })
  }, [ids, currency])

  const handleCurrencyType = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(selectCurrencyAction(event.target.value as CurrencyType))
    },
    [dispatch],
  )

  const handleTableType = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { type } = event.currentTarget.dataset
      type && dispatch(selectTableAction(type as TableType))
    },
    [dispatch],
  )

  const handleAddFavor = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      const { id } = event.currentTarget.dataset
      id && dispatch(addFavoritesAction(id))
    },
    [dispatch],
  )

  const handleRemoveFavor = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      const { id } = event.currentTarget.dataset
      id && dispatch(removeFavoritesAction(id))
    },
    [dispatch],
  )

  const changeHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  const handleRow = useCallback(
    (event: MouseEvent<HTMLTableRowElement>) => {
      const { id } = event.currentTarget.dataset
      navigate(`/chart/${id}`)
    },
    [navigate],
  )

  const handleWallet = useCallback(() => {
    navigate('/wallet')
  }, [navigate])

  const data = useMemo(
    () =>
      !!list
        ? list.filter(({ name, symbol }) => name.toLowerCase().includes(value) || symbol.toLowerCase().includes(value))
        : [],
    [list, value],
  )

  return (
    <CryptoContainer>
      <SearchContainer>
        <SearchWrapper>
          <InputSearch fullWidth variant={'outlined'} placeholder={'Search'} onChange={changeHandle} />
          <ActionsWrapper>
            {(Object.keys(TableType) as Array<keyof typeof TableType>).map((type) => (
              <ButtonAction key={type} onClick={handleTableType} data-type={type}>
                {type}
              </ButtonAction>
            ))}
            <ButtonAction onClick={handleWallet}>Wallet</ButtonAction>
            <Select id="select-currency" select value={currency} onChange={handleCurrencyType}>
              {['usd', 'eur'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </ActionsWrapper>
        </SearchWrapper>
      </SearchContainer>
      <CryptoList>
        <TableWrapper>
          <TableContainer>
            {loading ? (
              <Progress />
            ) : data.length ? (
              <Table>
                <TableHeadStyled>
                  <TableRow>
                    {['', 'Name', 'Symbol', 'Price', '24 change'].map((head) => (
                      <TableCellStyled key={head} align={'right'}>
                        {head}
                      </TableCellStyled>
                    ))}
                  </TableRow>
                </TableHeadStyled>
                <TableBody>
                  {data.map((elem) => {
                    const profit = elem.price_change_percentage_24h > 0
                    const isFavorite = favorites.includes(elem.id)
                    return (
                      <TableRowStyled key={elem.name} onClick={handleRow} data-id={elem.id}>
                        <FavouriteTableCell>
                          <IconButton onClick={isFavorite ? handleRemoveFavor : handleAddFavor} data-id={elem.id}>
                            {isFavorite ? <StarRounded color={'primary'} /> : <StarOutlineRounded />}
                          </IconButton>
                        </FavouriteTableCell>
                        <NameTableCell>
                          <CryptoImage src={elem.image} alt={elem.name} height={'30'} />
                          <div>{elem.name.toUpperCase()}</div>
                        </NameTableCell>
                        <TableCellStyled>
                          <div>{elem.symbol.toUpperCase()}</div>
                        </TableCellStyled>
                        <TableCellStyled>{`${getLabelCurrency(currency)}${elem.current_price.toFixed(
                          2,
                        )}`}</TableCellStyled>
                        <TableCellStyled>{`${profit ? '+' : ''}${elem.price_change_percentage_24h.toFixed(
                          2,
                        )}%`}</TableCellStyled>
                      </TableRowStyled>
                    )
                  })}
                </TableBody>
              </Table>
            ) : tableType === TableType.all ? (
              <div>No cryptos</div>
            ) : (
              <div>No favorites</div>
            )}
          </TableContainer>
        </TableWrapper>
      </CryptoList>
    </CryptoContainer>
  )
}
