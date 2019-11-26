import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { authReducer, Auth } from './auth'
import { uiReducer, UI } from './ui'
import rootSaga from './configureSaga'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

export type AppState = {
  auth: Auth
  ui: UI
}

const reducers = combineReducers<AppState>({ auth: authReducer, ui: uiReducer })

const configureStore = () => {
  const store = createStore(reducers, {}, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
