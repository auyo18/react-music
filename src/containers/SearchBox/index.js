import React, {PureComponent} from 'react'
import './index.scss'

class SearchBox extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.keyword) {
      const keyword = nextProps.keyword.trim()
      if (keyword !== this.props.keyword.trim()) {
        this.setState(() => ({
          keyword: keyword
        }))
      }
    }
  }

  changeKeyword = value => {
    const keyword = value.trim()
    this.setState(() => ({
      keyword: keyword
    }))
    this.props.changeKeyword(keyword)
  }

  clearKeyword = () => {
    this.setState(() => ({
      keyword: ''
    }))
    this.props.changeKeyword('')
  }

  render() {
    return (
      <div className="search-box-wrapper">
        <div className="search-box">
          <i className="iconfont search-icon iconsousuo" />
          <input placeholder="搜索歌曲、歌手" type="text" value={this.props.keyword} className="search-input" onChange={e => {
            this.changeKeyword(e.target.value)
          }} />
          <i
            className="iconfont icon-delete iconshanchu delete"
            onClick={this.clearKeyword}
            style={this.state.keyword.trim() ? {} : {display: 'none'}} />
        </div>
      </div>
    )
  }
}

export default SearchBox
