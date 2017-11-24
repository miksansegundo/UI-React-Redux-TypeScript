
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'

import Home from './containers/Home'
import Other from './containers/Other'

import { store } from './libs/store'
import { providePage } from './libs/dom.utils'

module.exports = function (pageName) {
  let Page
  switch (pageName) {
    case 'Home':
      Page = Home
    break
    case 'Other':
      Page = Other
  }
  return ReactDOMServer.renderToString(providePage(<Page />, store))
}