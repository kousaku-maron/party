import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { appAuthReducer, AppAuth } from './app/auth/reducer'
import { uiReducer, UI } from './ui/reducer'
import { domainUserReducer, DomainUser } from './domain/user/reducer'
import rootSaga from './configureSaga'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const { logger } = require('redux-logger')
  // middlewares.push(logger)
}

type DomainState = {
  user: DomainUser
}

type AppState = {
  auth: AppAuth
}

export type StoreState = {
  domain: DomainState
  app: AppState
  ui: UI
}

const domainReducers = combineReducers<DomainState>({ user: domainUserReducer })
const appReducers = combineReducers<AppState>({ auth: appAuthReducer })

const reducers = combineReducers<StoreState>({
  domain: domainReducers,
  app: appReducers,
  ui: uiReducer
})

const configureStore = () => {
  const store = createStore(reducers, {}, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
