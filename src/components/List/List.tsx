
import * as React from 'react'
import {getListFiltered, getSearch} from '../../reducers/data.reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  } from '../../actions/data.actions'

interface IListProps {
  listVisible: any[],
  search: {
    search: ''
  },
  actions: {
    setSearchAction: (search: string) => void
  }
}

const List = function (props: IListProps) {
  let { listVisible, search } = props
  let { setSearchAction } = props.actions

  function setSearch (e) {
    const search = e.target.value
    setSearchAction(search)
  }
  return (
    <div>
      <div className="row ts-list-filter">
        <div className="col-lg-offset-6">
          <div className="input-group">
            <input type="text" className="form-control" onChange={setSearch} value={search.search} placeholder="Search for..." />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">Search</button>
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        {listVisible && listVisible.map((item)=>(
          <div className="col-sm-6 col-md-4" key={item.id}>
            <div className="thumbnail ts-thumb">
              <img src={item.thumbnailUrl} alt={item.title}/>
              <div className="caption">
                <h3>{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function mapStateToProps (state, props) {
  return {
    search: state.data.listFilter.search,
    listVisible: getListFiltered(state)
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(List)