import { AppState } from '../reducers'
import { TableType } from '../../enums'
import { CurrencyType } from '../types'

export const currencySelector = (state: AppState): CurrencyType => state.currency
export const tableTypeSelector = (state: AppState): TableType => state.tableType
export const idsSelector = (state: AppState): string => state.ids
export const favoritesSelector = (state: AppState): string[] => state.favorites
