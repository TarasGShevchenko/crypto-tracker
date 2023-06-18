import { createAction } from 'typesafe-actions'

import { TableType } from '../../enums'
import { CurrencyType } from '../types'

export const selectCurrencyAction = createAction('@@selectCurrencyAction')<CurrencyType>()
export const addFavoritesAction = createAction('@@addFavoritesAction')<string>()
export const removeFavoritesAction = createAction('@@removeFavoritesAction')<string>()
export const selectTableAction = createAction('@@selectTableAction')<TableType>()
