import axios from 'axios'

const apiUrl = 'https://api.coingecko.com/api/v3'

export const fetchCryptos = async (ids: string, vs_currency: string) => {
  try {
    return await axios.get(`${apiUrl}/coins/markets`, {
      params: {
        vs_currency: vs_currency || 'usd',
        ids,
      },
    })
  } catch (error) {
    console.error('Error fetching Crypto data:', error)
  }
}

export const fetchCryptoForChart = async (id: string, vs_currency: string) => {
  try {
    return await axios.get(`${apiUrl}/coins/${id}/market_chart`, {
      params: {
        vs_currency: vs_currency || 'usd',
        days: 30,
      },
    })
  } catch (error) {
    console.error('Error fetching Chart data:', error)
  }
}
