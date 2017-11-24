import { Action as ReduxAction } from 'redux'
import { isType } from 'redux-typescript-actions'
import {
  loading,
  authenticating,
  setLoginErrorAction,
  showDestinationAction,
  showOverlayAction,
  loadingSuggestionsAction,
  setDestinationReadyAction
} from '../actions/global.actions'

const DEFAULT_STATE = {
  brand: 'Wedjago.com',
  loading: true,
  authenticating: false,
  loginError: false,
  loginErrorMsg: '',
  showDestination: false,
  showOverlay: '',
  loadingSuggestions: false,
  destinationReady: false
}

function setLoading(state, action) {
  const newState = {}
  Object.assign(newState, state, {loading: action.payload})
  return newState
}

function setAuthenticating(state, action) {
  const newState = {
    ...state,
    authenticating: action.payload
  }
  if (action.payload) {
    newState.loginError = false
    newState.loginErrorMsg = ''
  }
  return newState
}

function setLoginError (state, action) {
  const newState = {
    ...state,
    loginError: true,
    loginErrorMsg: action.payload.msg
  }
  return newState
}

function showDestination (state, action) {
  const newState = {
    ...state,
    showDestination: true
  }
  return newState
}

function showOverlay (state, action) {
  const newState = {
    ...state,
    showOverlay: action.payload.type === state.showOverlay ? '' : action.payload.type
  }
  return newState
}

function showDate (state, action) {
  const newState = {
    ...state,
    showDate: action.payload.type
  }
  return newState
}

function loadingSuggestions (state, action) {
  const newState = {
    ...state,
    loadingSuggestions: action.payload
  }
  return newState
}

function destinationReady (state, action) {
  const newState = {
    ...state,
    destinationReady: action.payload
  }
  return newState
}

export function global (state = DEFAULT_STATE, action:ReduxAction) {
  if (isType(action, loading)) {
    return setLoading(state, action)
  }
  if (isType(action, authenticating)) {
    return setAuthenticating(state, action)
  }
  if (isType(action, setLoginErrorAction)) {
    return setLoginError(state, action)
  }
  if (isType(action, showDestinationAction)) {
    return showDestination(state, action)
  }
  if (isType(action, showOverlayAction)) {
    return showOverlay(state, action)
  }
  if (isType(action, loadingSuggestionsAction)) {
    return loadingSuggestions(state, action)
  }
  if (isType(action, setDestinationReadyAction)) {
    return destinationReady(state, action)
  }
  return state
}

/**
 * SELECTORS
 */

export const getShowDestination = (state) => state.global.showDestination
export const getShowOverlay = (state) => state.global.showOverlay
export const getDestinationReady = (state) => state.global.destinationReady
export const getLoadingSuggestions = (state) => state.global.loadingSuggestions
