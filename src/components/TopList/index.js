import React, {PureComponent} from 'react'
import MusicList from "../MusicList"
import {CSSTransition} from "react-transition-group"
import {rankSong} from "../../api/rank"
import CreateSinger, {CreateSong} from "../../utils/singer"
import {connect} from "react-redux"

class TopList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      singer: {},
      songList: []
    }
  }

  async componentWillMount() {
    if (this.props.location.state && this.props.location.state.item) {
      let item = this.props.location.state.item
      await this.getMusicList(item)
      this.setState(() => ({
        singer: new CreateSinger({
          id: item.id,
          name: item.topTitle,
          avatar: item.avatar || item.picUrl
        })
      }))
    } else {
      this.props.history.push('/rank')
    }
  }

  componentDidMount() {
    this.setState(() => ({
      show: true
    }))
  }

  getMusicList = async item => {
    let {songlist, topinfo} = await rankSong(item.id)
    item.avatar = topinfo.pic_album
    this.setState(() => ({
      songList: this.normalizeSongs(songlist)
    }))
  }

  normalizeSongs = list => {
    let ret = []
    list.forEach(item => {
      ret.push(CreateSong(item.data, this.props.vKey))

    })
    return ret
  }

  back = () => {
    this.setState(() => ({
      show: false
    }), () => {
      setTimeout(() => {
        this.props.history.push('/rank')
      }, 300)
    })
  }

  render() {
    return (
      <CSSTransition
        in={this.state.show}
        timeout={300}
        className="slide music-list-wrapper fixed-container"
      >
        <div>
          <MusicList back={this.back} singer={this.state.singer} songList={this.state.songList}/>
        </div>
      </CSSTransition>
    )
  }
}

const mapStateToProps = state => ({
  vKey: state.player.vKey
})

export default connect(mapStateToProps, null)(TopList)
