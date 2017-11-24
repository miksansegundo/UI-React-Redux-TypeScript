import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
const createLogger = require('redux-logger')

import rootReducer from '../reducers/root.reducer'
import { rootEpic } from '../action-epics/root.epic'

// Basic Thunk Async Middleware
const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch) :
    next(action)

// Console Logger actions
const logger = createLogger()

// Epic RxJS Async Middleware
const epic = createEpicMiddleware(rootEpic)

// Redux Middleware
const middlewares = [thunk, /*logger,*/ epic]

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middlewares)
))

if (module.hot) {
  module.hot.accept('../reducers/root.reducer.ts', () => {
    const nextStore = require('../reducers/root.reducer.ts').default
    store.replaceReducer(nextStore);
  })
}
