import * as React from 'react'
import * as ReactDOM from 'react-dom'
const AppContainer = require('react-hot-loader').AppContainer
const Provider = require('react-redux').Provider

// Render component page
export function renderPage (page) {
  ReactDOM.render(
    page,
    rootElement()
  )
}

// Get page with container
export function providePage (page, store) {
  return (
    <Provider store={store}>
      <AppContainer>
        {page}
      </AppContainer>
    </Provider>
  )
}

// Get HTML DOM element root
export function rootElement () {
  return document.getElementById('root')
}