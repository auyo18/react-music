import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import './index.scss'
import {searchHistory} from "../../components/Search/store/actions"

class SearchHistory extends PureComponent {
  selectSearchKeyword = keyword => {
    this.props.changeKeyword(keyword)
  }

  render() {
    return (
      <div className="search-history-list">
        {
          this.props.searchHistory.map((item, index) => (
            <div
              className="search-item"
              onClick={() => {
                this.selectSearchKeyword(item)
              }}
              key={item}>
              <p>{item}</p>
              <i
                className="iconfont iconshanchu2"
                onClick={e => {
                  e.stopPropagation()
                  this.props.deleteSearchHistory(index, this.props.searchHistory)
                }}/>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchHistory: state.search.searchHistory
})

const mapDispatchToProps = dispatch => ({
  deleteSearchHistory(index, list) {
    let _list = list.slice()
    _list.splice(index, 1)
    dispatch(searchHistory(_list))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory)
