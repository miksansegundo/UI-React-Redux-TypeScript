import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDestinationAction, setCheckInAction, setCheckOutAction } from '../../actions/data.actions'
import { showDestinationAction, showOverlayAction, setDestinationReadyAction } from '../../actions/global.actions'
import { getDestination, getCheckIn, getCheckOut } from '../../reducers/data.reducer'
import { getShowDestination, getShowOverlay, getDestinationReady } from '../../reducers/global.reducer'
import RoomSelector from '../RoomSelector/RoomSelector'
import Destination from '../Destination/Destination'
const classNames = require('classnames')

interface ISearchProps {
  destination: string,
  destinationReady: boolean,
  showDestination: boolean,
  showOverlay: string,
  checkIn: string,
  checkOut: string,
  actions: {
    showOverlayAction: (type: {type: string}) => void,
    showDestinationAction: () => void,
    setDestinationAction: (search: string) => void
  }
}


function Search (props: ISearchProps) {
  const {destination, actions, showDestination, checkIn, checkOut, showOverlay, destinationReady} = props
  const {setDestinationAction, showDestinationAction, showOverlayAction} = actions
  let destinationShown = false
  function setDestination (e) {
    setDestinationAction(e.target.value)
    if (!destinationShown) {
      showDestinationAction()
      destinationShown = true
    }
  }
  function setCheckIn (e) {
    const date = e.target.value
    setCheckInAction(date)
  }
  function setCheckOut (e) {
    const date = e.target.value
    setCheckOutAction(date)
  }
  function setShowOverlay (type) {
    return () => showOverlayAction({type})
  }
  function isShowOverlay (check) {
    if (!showOverlay) return false
    if (showOverlay === check) {
      return false
    }
    return true
  }
  return (
    <div>
      <Destination />
      <div className={showDestination ? 'ts-search' : 'ts-hidden'}>
        <div className="ts-wrapper">
          <button className={classNames({
            'ts-search__btn ts-btn ts-btn--primary ts-btn__intro ts-ellipsis': true,
            'ts-disabled': !destinationReady
          })}>
            <span className="ts-btn__search-icon">
              <span className="material-icons">search</span>
            </span>
            <span className="ts-btn-content">Search</span>
          </button>
          <div className="ts-search-form ts-table">
            <button onClick={setShowOverlay('checkin')} className={classNames({
              "ts-btn-search-form ts-btn-checkin ts-table__cell ts-btn__md": true,
              "ts-disabled": isShowOverlay('checkin'),
              })}>
              <span className="">
                <span className="ts-btn-search__text--sm">Check-in</span>
                <input className="ts-btn-date" type="date" value={checkIn} onChange={setCheckIn} />
              </span>
            </button>
            <button onClick={setShowOverlay('checkout')} className={classNames({
              "ts-btn-search-form ts-btn-checkout ts-table__cell ts-btn__md": true,
              "ts-disabled": isShowOverlay('checkout')
              })}>
              <span className="">
                <span className="ts-btn-search__text--sm">Check-out</span>
                <input className="ts-btn-date" type="date" value={checkOut} onChange={setCheckOut} />
              </span>
            </button>
            <button className={classNames({
              'ts-btn-search-form ts-table__cell ts-btn__sm': true,
              "ts-disabled": isShowOverlay('rooms')
              })} onClick={setShowOverlay('rooms')}>
              <span className="ts-people-icon material-icons">people</span>
            </button>
            <RoomSelector />
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state, props) {
  return {
    checkIn: getCheckIn(state),
    checkOut: getCheckOut(state),
    destination: getDestination(state),
    showDestination: getShowDestination(state),
    showOverlay: getShowOverlay(state),
    destinationReady: getDestinationReady(state)
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators({
    setDestinationAction,
    showDestinationAction,
    showOverlayAction
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)