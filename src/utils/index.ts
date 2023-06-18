export const getFavoritesFromStorage = (): string[] | null => {
  const favorites = window.localStorage.getItem('favorites')
  return favorites && JSON.parse(favorites)
}

export const setFavoritesToStorage = (favorites: string[]) => {
  window.localStorage.setItem('favorites', JSON.stringify(favorites))
}
export const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  )
  return matches ? decodeURIComponent(matches[1]) : null
}

export const setCookie = (name: string, value: string, days: number): void => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/;`
}

export const getLabelCurrency = (currency: string): string =>
  (({ usd: '$', eur: '€' } as { [key: string]: string })[currency])
