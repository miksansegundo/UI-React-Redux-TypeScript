import { Action as ReduxAction } from 'redux'
import { isType } from 'redux-typescript-actions'
import { setUserAction, logoutAction } from '../actions/data.actions'

const DEFAULT_STATE = {}

function setUser (state, action) {
  const newState = {}
  const user = action.payload
  Object.assign(
    newState,
    state,
    user,
    { token: '2121212' }
  )
  return newState
}

function removeUser () {
  const newState = {}
  return newState
}

export function user (state = DEFAULT_STATE, action:ReduxAction) {
  if (isType(action, setUserAction)) {
    return setUser(state, action)
  }
  if (isType(action, logoutAction)) {
    return removeUser()
  }
  return state
}