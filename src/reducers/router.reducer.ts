import { Action as ReduxAction } from 'redux'
import { isType } from 'redux-typescript-actions'
import { setMenuActiveAction } from '../actions/router.actions'
import { setUserAction, logoutAction } from '../actions/data.actions'

const publicMenu = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Other',
    url: '/other.html'
  },
  {
    name: 'More',
    url: '/more.html'
  }
]

const privateMenu = [
  {
    name: 'Private',
    url: '/private.html'
  }
]

const DEFAULT_STATE = {
  menuActive: '',
  menuItems: publicMenu
}

const setMenuActive = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {menuActive: action.payload.url})
  return newState
}

const showMenuPrivate = (state) => {
  const newState = {}
  Object.assign(newState, state, {menuItems: [...publicMenu, ...privateMenu]})
  return newState
}

const showMenuPublic = (state) => {
  const newState = {}
  Object.assign(newState, state, {menuItems: publicMenu})
  return newState
}

export function router (state = DEFAULT_STATE, action:ReduxAction) {
  if (isType(action, setMenuActiveAction)) {
    return setMenuActive(state, action)
  }
  if (isType(action, setUserAction)) {
    return showMenuPrivate(state)
  }
  if (isType(action, logoutAction)) {
    return showMenuPublic(state)
  }
  return state
}