import { createStore, compose } from 'redux'

import { reducer } from './reducers'

const store = createStore(reducer, compose)

export default store
