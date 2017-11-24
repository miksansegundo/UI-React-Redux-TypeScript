import * as React from 'react'
import { renderPage, providePage } from './dom.utils'
import { store } from './store'

// Pages Components
import Other from '../containers/Other'
import Home from '../containers/Home'

export default {
  '/': Home,
  '/other.html': Other
}

if (module.hot) {
  module.hot.accept('../containers/Home.tsx', () => {
    const Page = require('../containers/Home.tsx').default
    renderPage(providePage(<Page />, store))
  })

  module.hot.accept('../containers/Other.tsx', () => {
    const Page = require('../containers/Other.tsx').default
    renderPage(providePage(<Page />, store))
  })
}