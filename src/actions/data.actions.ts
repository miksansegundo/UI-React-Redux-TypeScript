import actionCreatorFactory from 'redux-typescript-actions'
const actionCreator = actionCreatorFactory()
import { loading } from './global.actions'
import * as api from '../apis/http.api'

export const getSuggestionsAction = actionCreator<string>('GET_SUGGESTIONS')
export const setSuggestionsAction = actionCreator<{}>('SET_SUGGESTIONS')
export const setDestinationSearchAction = actionCreator<string>('SET_DESTINATION_SEARCH')
export const setSearchAction = actionCreator<string>('SET_SEARCH')
export const setDataAction = actionCreator<{type: string, data: any}>('SET_DATA')
export const setDestinationAction = actionCreator<string>('SET_DESTINATION')
export const setCheckInAction = actionCreator<string>('SET_CHECKIN')
export const setCheckOutAction = actionCreator<string>('SET_CHECKOUT')
export const getUserAction = actionCreator<{token: string}>('FETCH_USER')
export const loginAction = actionCreator<{user: string, pwd: string}>('LOGIN_USER')
export const logoutAction = actionCreator<{token: string}>('LOGOUT_USER')
export const setUserAction = actionCreator<{}>('SET_USER')
export const setRoomsAction = actionCreator<{type: string, rooms: any}>('SET_ROOMS')

export function getDataAction (action) {
  return (dispatch) => {
    dispatch(loading(true))
    api.getData(action.type)
      .then((data) => {
        return dispatch(setDataAction({type: action.type, data}))
      })
      .then(() => {
        dispatch(loading(false))
      })
  }
}