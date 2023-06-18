import { createReducer } from 'typesafe-actions'

import { addFavoritesAction, removeFavoritesAction, selectCurrencyAction, selectTableAction } from '../actions'
import { TableType } from '../../enums'
import { getFavoritesFromStorage, setFavoritesToStorage } from '../../utils'
import { ActionTypes, CurrencyType } from '../types'

const DEFAULT_CURRENCIES = [
  'bitcoin',
  'ethereum',
  'litecoin',
  'ripple',
  'dogecoin',
  'solana',
  'cosmos',
  'stellar',
  'aptos',
  'near',
]

export interface AppState {
  currency: CurrencyType
  favorites: string[]
  tableType: TableType
  ids: string
}

export const initialState: AppState = {
  currency: 'usd',
  favorites: getFavoritesFromStorage() || [],
  tableType: TableType.all,
  ids: DEFAULT_CURRENCIES.join(','),
}

export const reducer = createReducer<AppState, ActionTypes>(initialState)
  .handleAction(selectCurrencyAction, (state, { payload: currency }) => ({
    ...state,
    currency,
  }))
  .handleAction(addFavoritesAction, (state, { payload }) => {
    const favorites = [...state.favorites, payload]
    setFavoritesToStorage(favorites)
    return {
      ...state,
      favorites,
    }
  })
  .handleAction(removeFavoritesAction, (state, { payload }) => {
    const favorites = state.favorites.filter((favorite) => favorite !== payload)
    setFavoritesToStorage(favorites)
    return {
      ...state,
      favorites: favorites,
      ...(state.tableType === TableType.favorites && {
        ids: favorites.length ? favorites.join(',') : 'none',
      }),
    }
  })
  .handleAction(selectTableAction, (state, { payload: tableType }) => ({
    ...state,
    tableType,
    ids: tableType === TableType.all ? initialState.ids : state.favorites.length ? state.favorites.join(',') : 'none',
  }))
