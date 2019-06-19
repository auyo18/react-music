import React, {PureComponent} from 'react'
import {CSSTransition} from "react-transition-group"
import {singerMusicList} from "../../api/singer"
import MusicList from '../../components/MusicList'
import {CreateSong} from "../../utils/singer"
import {connect} from "react-redux"

const time = 300

class SingerDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      singer: {},
      songList: []
    }
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.singer) {
      let {singer} = this.props.location.state
      this.getMusicList(singer.id)
      this.setState(() => ({
        singer
      }))
    } else {
      this.props.history.push('/singer')
    }
  }

  componentDidMount() {
    this.setState(() => ({
      show: true
    }))
  }

  getMusicList = async singermid => {
    let {data} = await singerMusicList(singermid)
    this.setState(() => ({
      songList: this.normalizeSongs(data.list)
    }))
  }

  normalizeSongs = list => {
    let ret = []
    list.forEach(item => {
      const musicData = item.musicData
      if (musicData) {
        ret.push(CreateSong(musicData, this.props.vKey))
      }
    })
    return ret
  }

  back = () => {
    this.setState(() => ({
      show: false
    }), () => {
      setTimeout(() => {
        if (this.props.location.state.entry === 'search') {
          this.props.history.push('/search')
        } else {
          this.props.history.push('/singer')
        }
      }, time)
    })
  }


  render() {
    return (
      <CSSTransition
        in={this.state.show}
        timeout={time}
        className="slide music-list-wrapper fixed-container"
      >
        <div>
          <MusicList back={this.back} singer={this.state.singer} songList={this.state.songList} />
        </div>
      </CSSTransition>
    )
  }
}

const mapStateToProps = state => ({
  vKey: state.player.vKey
})

export default connect(mapStateToProps, null)(SingerDetail)
