
import * as React from 'react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { connect } from 'react-redux'

const Other = React.createClass<any, any>({
  displayName: 'Other',
  render() {
    return (
      <div>
        <Header {...this.props} />
        <div className="page-header">
          <h1>Other</h1>
        </div>
        <div>
          <p>Some content.</p>
        </div>
        <Footer />
      </div>
    )
  }
})

export default connect()(Other)