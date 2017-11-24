import * as React from 'react'
import actionCreatorFactory from 'redux-typescript-actions'
import {renderPage, providePage} from '../libs/dom.utils'
const actionCreator = actionCreatorFactory();
const urlMapperFactory = require('url-mapper')
const urlMapper = urlMapperFactory()

// Connector & store
import { store } from '../libs/store'

// App Routes
import routes from '../libs/routes'

// SET_MENU_ACTIVE
export const setMenuActiveAction = actionCreator<{url: string}>('SET_MENU_ACTIVE')

// Navigation Controller
export function navigate (event) {
  const url = event.url || event.target.dataset.url
  const matchedRoute = urlMapper.map(url, routes)

  if (event.preventDefault) {
    event.preventDefault()
  }

  if (matchedRoute) {
    return pageFound(url, matchedRoute)
  } else {
    return pageNotFound()
  }
}

// Add to history, render component, set menu item active
function pageFound (url, matchedRoute) {
  if (window && window.location.pathname !== url) {
    window.history.pushState(null, null, url)
  }

  const Page = matchedRoute.match
  const props = matchedRoute.values
  renderPage(providePage(<Page {...props} />, store))

  return setMenuActiveAction({url})
}

// Redirect to Home page
function pageNotFound() {
  const payload = { url: '/' }
  navigate(payload)

  return setMenuActiveAction(payload)
}