import * as React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setRoomsAction } from '../../actions/data.actions'
import { showOverlayAction } from '../../actions/global.actions'
import { getRooms } from '../../reducers/data.reducer'
import { getShowOverlay } from '../../reducers/global.reducer'

interface IRoomsSelectorProps {
  rooms: {},
  showOverlay: string,
  actions: {
    setRoomsAction: (obj: {type: string, rooms: any}) => any,
    showOverlayAction: (type: any) => any
  }
}

function RoomSelector (props: IRoomsSelectorProps) {
  const {rooms, showOverlay, actions} = props
  const {setRoomsAction, showOverlayAction} = actions
  if (showOverlay !== 'rooms') {
    return null
  }

  function setRooms (type) {
    return _ => {
      setRoomsAction({
        type,
        rooms: []
      })
      showOverlayAction({type : ''})
    }
  }

  return (
  <div className="ts-room-selector">
    <ul className="ts-list-menu">
      <li onClick={setRooms('single')} className="ts-list-item ts-room-type ts-single ts-table">
        <span className="ts-people-icon material-icons ts-table__cell ts-width__20">people</span>
        <span className="ts-label ts-table__cell">Single Room</span>
      </li>
      <li onClick={setRooms('double')} className="ts-list-item ts-room-type ts-double ts-table">
        <span className="ts-people-icon material-icons ts-table__cell ts-width__20">people</span>
        <span className="ts-label ts-table__cell">Double Room</span>
      </li>
      <li onClick={setRooms('multi')} className="ts-list-item ts-room-type ts-family ts-table">
        <span className="ts-people-icon material-icons ts-table__cell ts-width__20">people</span>
        <span className="ts-label ts-table__cell">Family Rooms</span>
      </li>
      <li onClick={setRooms('multi')} className="ts-list-item ts-room-type ts-multi ts-table">
        <span className="ts-people-icon material-icons ts-table__cell ts-width__20">people</span>
        <span className="ts-label ts-table__cell">Multiple Rooms</span>
      </li>
    </ul>
    <span className="ts-overlay-arrow"></span>
  </div>)
}

function mapStateToProps (state, props) {
  return {
    rooms: getRooms(state),
    showOverlay: getShowOverlay(state)
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators({
    setRoomsAction,
    showOverlayAction
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelector)