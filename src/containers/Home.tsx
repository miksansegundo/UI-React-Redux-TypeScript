
import * as React from 'react'
import { Header } from '../components/Header/Header'
import Search from '../components/Search/Search'
import List from '../components/List/List'
import Intro from '../components/Intro/Intro'
import { Footer } from '../components/Footer/Footer'
import { Loading } from '../components/Loading/Loading'
import { connect } from 'react-redux'

interface IProps {}

const Home = React.createClass<IProps, any>({
  displayName: 'Home',
  componentDidMount() {
  },
  render() {
    return (
      <div className="">
        <Header {...this.props} />
        <Intro />
        <Search />
      </div>
    )
  }
})

export default connect()(Home)