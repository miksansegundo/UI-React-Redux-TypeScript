import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const spinner = require('../Loading/img/spinner.svg')

import {
  setDestinationAction,
  setCheckInAction,
  setCheckOutAction,
  getSuggestionsAction,
  setDestinationSearchAction,
  setSuggestionsAction
} from '../../actions/data.actions'
import {
  getDestination,
  getCheckIn,
  getCheckOut,
  getSuggestions,
  getSearch,
  getDestinationSearch
} from '../../reducers/data.reducer'
import {showDestinationAction, showOverlayAction, setDestinationReadyAction} from '../../actions/global.actions'
import { getShowDestination, getShowOverlay, getLoadingSuggestions } from '../../reducers/global.reducer'

const classNames = require('classnames')

interface IDestinationProps {
  destinationSearch: string,
  showDestination: boolean,
  loadingSuggestions: boolean,
  suggestions: {
    total: number,
    zones: [any],
    groupZones: [any],
    destinations: [any],
    hotels: [any]
  },
  actions: {
    setDestinationReadyAction: (boolean) => void,
    setDestinationSearchAction: (destination: {}) => void,
    setDestinationAction: (destination: string) => void,
    getSuggestionsAction: (string: string) => void,
    setSuggestionsAction: (data: any) => void,
    showDestinationAction: () => void,
    showOverlayAction: (type: { type: string }) => void,
  }
}

function Destination (props: IDestinationProps) {
  const {destinationSearch, actions, showDestination, suggestions, loadingSuggestions} = props
  const {
    setDestinationAction,
    showDestinationAction,
    showOverlayAction,
    setDestinationSearchAction,
    getSuggestionsAction,
    setSuggestionsAction,
    setDestinationReadyAction
  } = actions
  let destinationShown = false
  function setDestination (destination) {
    setDestinationAction(destination)
  }
  function setShowOverlay (type) {
    return () => showOverlayAction({type})
  }
  function setSuggestion (item) {
    return () => {
      setDestinationSearchAction(item.name)
      closeSuggestions()
      setDestinationReadyAction(true)
      if (item.type === 'zone') {
        return setDestination({
          code: item.destinationCode,
          zone: item.code
        })
      }
      if (item.type === 'destination') {
        return setDestination({
          code: item.code
        })
      }
      if (item.type === 'groupzone') {
        return setDestination({
          code: item.destinationCode,
          zone: item.zones
        })
      }
      if (item.accommodationType) {
        return setDestination({
          hotel: item.code
        })
      }
    }
  }
  function setDestinationSearch (e) {
    const search = e.target.value
    setDestinationSearchAction(e.target.value)
    setDestinationReadyAction(false)
    if (search.length > 3) {
      getSuggestionsAction(search)
    } else {
      closeSuggestions()
    }
    if (!destinationShown) {
      showDestinationAction()
      destinationShown = true
    }
  }

  function closeSuggestions () {
    setSuggestionsAction({total: 0})
  }

  function getSuggestionType (item, type) {
    let hotelType
    if (type === 'hotel' && item.accommodationType) {
      hotelType = item.accommodationType.typeMultiDescription
    }
    return (
      <span className="ts-table__cell ts-suggestion__type">
        <span className="material-icons">{type}</span>
        {hotelType &&
          <span className="ts-suggestion__type-text">{hotelType}</span>
        }
      </span>
    )
  }

  function getSuggestionCountry (item) {
    let country
    if (item.country) country = item.country.description
    if (item.countryCode) country = item.countryCode.description
    if (country) return (
      <span>
        <span>{country}</span>
      </span>
    )
  }

  function renderSuggestions (list, type) {
    return list.map((item, i) => (
      <li onClick={setSuggestion(item)} className="ts-list-item ts-suggestion ts-table" key={i}>
        {getSuggestionType(item, type)}
        <span className="ts-table__cell">
          <span className="ts-suggestion__title">
            {item.name &&
              <span>
                <span>{item.name}</span>
              </span>
            }
            {item.city &&
              <span>
                <span> - </span>
                <span className="ts-capitalize">{item.city.toLowerCase()}</span>
              </span>
            }
          </span>
          <span className="ts-suggestion__subtitle">
              {getSuggestionCountry(item)}
          </span>
        </span>
      </li>
    ))
  }
  return (
    <div className="ts-search-container">
      <input id="ts-search" onClick={setShowOverlay('')} onChange={setDestinationSearch} value={destinationSearch} className={showDestination ? "ts-search__input" : "ts-input ts-input-hidden"} type="search" role="combobox" aria-expanded="false" aria-autocomplete="list" autoComplete="off" autoCorrect="off" autoCapitalize="false" spellCheck={false} placeholder="Your destination" />
      {suggestions.total > 0  &&
        <div className="ts-suggestions ts-overlay">
          <ul className={classNames({
            "ts-list-menu ts-suggestions__list": true,
            'ts-hidden': loadingSuggestions
          })}>
          {renderSuggestions(suggestions.destinations, 'location_city')}
          {renderSuggestions(suggestions.groupZones, 'location_on')}
          {renderSuggestions(suggestions.zones, 'location_on')}
          {renderSuggestions(suggestions.hotels, 'hotel')}
          </ul>
          <div className={loadingSuggestions ? 'ts-suggestions-loading' : 'ts-hidden'}>
            <img src={spinner} alt="Loading"/>
          </div>
        </div>
      }
    </div>
  )

  /* CLOSE
   <div onClick={closeSuggestions} className="ts-suggestions__footer ts-table">
   <span className="ts-table__cell ts-suggestions__close">Close ({suggestions.total})</span>
   <span className="ts-table__cell ts-suggestions__close-icon material-icons">close</span>
   </div>
  */
}

function mapStateToProps (state, props) {
  return {
    suggestions: getSuggestions(state),
    destination: getDestination(state),
    destinationSearch: getDestinationSearch(state),
    showDestination: getShowDestination(state),
    loadingSuggestions: getLoadingSuggestions(state),
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators({
    setDestinationReadyAction,
    setDestinationAction,
    showDestinationAction,
    showOverlayAction,
    setDestinationSearchAction,
    getSuggestionsAction,
    setSuggestionsAction
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Destination)