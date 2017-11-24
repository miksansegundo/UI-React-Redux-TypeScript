import * as React from 'react'
import { connect } from 'react-redux'
require('./styles.css')
import { bindActionCreators } from 'redux'
import {loginAction, logoutAction} from '../../actions/data.actions'

export interface IUserProps {
  actions: {
    logoutAction: (Object:{token: string}) => void,
    loginAction: (Object:{user: string, pwd: string}) => void
  }
  user: {
    avatar_url: string,
    name: string,
    token: string
  },
  authenticating: boolean,
  loginError: boolean,
  loginErrorMsg: string
}

function User (props: IUserProps) {
  const { loginAction, logoutAction } = props.actions
  const { authenticating, loginError, loginErrorMsg } = props
  const { name, token, avatar_url } = props.user

  function submitForm (e) {
    e.preventDefault()
    const inputs = e.target.elements
    loginAction({user: inputs.user.value, pwd: inputs.pwd.value})
  }

  function logout (e) {
    e.preventDefault()
    logoutAction({token})
  }

  return (
    <div className="ts-user navbar-right">
      {authenticating &&
        <p className="navbar-text" >Authenticating...</p>
      }
      {loginError &&
        <p className="navbar-text ts-text-error">{loginErrorMsg}</p>
      }
      {!token &&
        <form className="navbar-form navbar-right" onSubmit={submitForm}>
          <div className="form-group">
            <input name="user" required type="text" className="ts-user-input form-control"
                   placeholder="Username" />
            <input name="pwd" required type="password" className="ts-user-input form-control"
                   placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default" disabled={authenticating}>Sign in</button>
        </form>
      }
      {token &&
        <div>
          <button type="button" className="btn btn-default navbar-btn">
            <img src={avatar_url} alt={name} width="20" className="ts-user-avatar"/>
            {name}
          </button>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#" onClick={logout}>Log out</a></li>
          </ul>
        </div>
      }
    </div>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user,
    authenticating: state.global.authenticating,
    loginError: state.global.loginError,
    loginErrorMsg: state.global.loginErrorMsg
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    loginAction, logoutAction
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(User)