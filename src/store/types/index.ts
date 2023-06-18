import { ActionType } from 'typesafe-actions'

import * as actions from '../actions'

export type ActionTypes = ActionType<typeof actions>

export interface ICrypto {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: Date
  atl: number
  atl_change_percentage: number
  atl_date: Date
  roi: IRoi | null
  last_updated: Date
}
export interface IRoi {
  times: number
  currency: string
  percentage: number
}
export type Price = [number, number]
export type CurrencyType = 'usd' | 'eur'
