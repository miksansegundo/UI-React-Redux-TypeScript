import * as React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDestinationAction } from '../../actions/data.actions'
import { showDestinationAction } from '../../actions/global.actions'
import { getDestination } from '../../reducers/data.reducer'
import { getShowDestination } from '../../reducers/global.reducer'

function Intro (props: any) {
  const {destination, actions, showDestination} = props
  return (
    <section className={showDestination ? "ts-hidden" : "ts-intro"}>
      <div className="ts-center">
        <h1 className="ts-title">
          <span className="ts-title--text">
              Find your ideal hotel
          </span>
          <span className="ts-title--text">
              for the best price
          </span>
        </h1>
        <input className="ts-input" type="search" role="combobox" aria-expanded="false" aria-autocomplete="list" autoComplete="off" autoCorrect="off" autoCapitalize="false" spellCheck={false} value="" />
        <button className="ts-btn ts-btn--primary ts-btn__intro ts-ellipsis">
          <span className="ts-btn__search-icon ts-btn__search-icon--intro">
            <span className="material-icons">search</span>
          </span>
          <span className="ts-btn-content">Search</span>
        </button>
      </div>
    </section>
  )

}

function mapStateToProps (state, props) {
  return {
    destination: getDestination(state),
    showDestination: getShowDestination(state)
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators({
    setDestinationAction,
    showDestinationAction
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)