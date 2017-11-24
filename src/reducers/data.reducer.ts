import { Action as ReduxAction } from 'redux'
import { isType } from 'redux-typescript-actions'
import {
  setDestinationAction,
  setRoomsAction,
  setSuggestionsAction,
  setDestinationSearchAction
} from '../actions/data.actions'
import { createSelector } from 'reselect'
const moment = require('moment')

const DEFAULT_STATE = {
  destinationSearch: '',
  suggestions: [],
  hotels: null,
  paginationInfo: {},
  sortInfo: {},
  search: {
    stay: {
      checkIn: moment().format('YYYY-MM-DD'),
      checkOut: moment().add(2, 'd').format('YYYY-MM-DD')
    },
    destination: {
      code: ''
    },
    occupancies: [{
      rooms: 1,
      adults: 2,
      children: 0,
      paxes: [
        /* {
         type: 'CH',
         age: 30
         } */
      ]
    }]
  },
  config: {
    maxResults: 25
  }
}
const memoized = {
  lastResults: []
}

function setDestination (state, action) {
  if (action.payload.hotel) {
    return {
      ...state,
      search: {
        ...state.search,
        hotels: {
          hotel: [ action.payload.hotel ]
        }
      }
    }
  }
  return {
    ...state,
    search: {
      ...state.search,
      destination: action.payload
    }
  }
}

function setDateCheckIn (state, action) {
  return {
    ...state,
    search: {
      ...state.search,
      stay: {
        ...state.search.stay,
        checkIn: action.payload
      }
    }
  }
}

function setText (state, action) {
  return {
    ...state,
    text: action.payload.text
  }
}

function setSuggestions (state, action) {
  debugger
  return {
    ...state,
    suggestions: action.payload
  }
}

function setRooms (state, action) {
  switch (action.payload.type) {
    case 'single':
      return {
        ...state,
        occupancies: [
          {
            rooms: 1,
            adults: 1,
            children: 0
          }
        ]
      }
    case 'double':
      return {
        ...state,
        occupancies: [
          {
            rooms: 1,
            adults: 2,
            children: 0
          }
        ]
      }
    case 'multi':
      return {
        ...state,
        occupancies: action.payload.rooms
      }

  }

  return state
}

function setDateCheckOut (state, action) {
  return {
    ...state,
    search: {
      ...state.search,
      destination: action.payload
    }
  }
}

function setDestinationSearch (state, action) {
  return {
    ...state,
    destinationSearch: action.payload
  }
}

function setPax (state, action) {
  const newState = {...state}
  if (action.payload.type === 'ages') {
    newState.search.occupancies.ages[action.payload.index] = {
      type: 'CH',
      age: parseInt(action.payload.age)
    }
  } else {
    newState.search.occupancies[action.payload.type] = parseInt(action.payload.number)
    /* if (action.payload.type === 'children') {
     newState.search.occupancies.paxes = []
     } */
  }
  return newState
}


export const getDestinationSearch = (state) => state.data.destinationSearch
export const getSuggestions = (state) => state.data.suggestions
export const getRooms = (state) => state.data.search.occupancies
export const getDestination = (state) => state.data.search.destination.code
export const getCheckIn = (state) => state.data.search.stay.checkIn
export const getCheckOut = (state) => state.data.search.stay.checkOut
export const getHotels = (state) => state.data.hotels
const getListFilter = (state) => state.data.listFilter
const getMaxResults = (state) => state.data.listFilter.maxResults
export const getSearch = (state) => state.data.listFilter.search
const getInitial = createSelector(
  getHotels, getMaxResults,
  (list, maxResults) => {
    return list.slice(0, maxResults)
  }
)

export const getListFiltered = createSelector(
  getListFilter, getHotels, getInitial,
  (listFilter, list, initialList) => {
    const search = listFilter.search.search.toUpperCase()

    if (!search || search.length === 0) {
      return initialList
    }
    if (search.length < 3) {
      return memoized.lastResults.length && memoized.lastResults || initialList
    }
    return memoized.lastResults = list
      .filter((item) => {
        return (item.title.toUpperCase().indexOf(search) > 0)
      })
      .slice(0, listFilter.maxResults)
  }
)

export function data (state = DEFAULT_STATE, action:ReduxAction) {
  if (isType(action, setDestinationAction)) {
    return setDestination(state, action)
  }
  if (isType(action, setRoomsAction)) {
    return setRooms(state, action)
  }
  if (isType(action, setSuggestionsAction)) {
    return setSuggestions(state, action)
  }
  if (isType(action, setDestinationSearchAction)) {
    return setDestinationSearch(state, action)
  }
  return state
}
