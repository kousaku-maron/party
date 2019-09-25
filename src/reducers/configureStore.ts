import { combineReducers, createStore, applyMiddleware } from 'redux'
import { authReducer, Auth } from './auth'

const middlewares = []

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

export type AppState = {
  auth: Auth
}

const reducers = combineReducers<AppState>({ auth: authReducer })

const configureStore = () => {
  const store = createStore(reducers, {}, applyMiddleware(...middlewares))
  return store
}

export default configureStore
