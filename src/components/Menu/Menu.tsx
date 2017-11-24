import * as React from 'react'
require('./styles.css')
const classNames = require('classnames')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate } from '../../actions/router.actions'

export interface IMenuProps {
  actions:{
    navigate: (event) => void
  },
  menuActive: string
  menuItems: {
    name: string,
    url: string
  }[]
}

function Menu (props: IMenuProps) {
  const { navigate } = props.actions
  const { menuActive, menuItems } = props

  return (
    <nav role='menu' >
      <ul className="nav navbar-nav">
        {menuItems.map((item) => (
          <li key={item.url} className={classNames({'active': menuActive === item.url})}>
            <a href={item.url} data-url={item.url}
               onClick={navigate}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function mapStateToProps (state, props) {
  return {
    menuActive: state.router.menuActive,
    menuItems: state.router.menuItems
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    navigate
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)