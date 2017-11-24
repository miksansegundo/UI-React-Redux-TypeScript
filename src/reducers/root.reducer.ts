
import { combineReducers } from 'redux'

import { router } from './router.reducer'
import { global } from './global.reducer'
import { data } from './data.reducer'
import { user } from './user.reducer'

export default combineReducers({
  router,
  global,
  data,
  user
})