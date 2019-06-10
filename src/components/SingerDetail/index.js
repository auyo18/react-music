import React, {PureComponent} from 'react'
import './index.scss'
import {CSSTransition} from "react-transition-group"
import {singerMusicList} from "../../api/singer"
import MusicList from '../../containers/MusicList'
import {CreateSong} from "../../utils/singer"

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
    if (this.props.location.state && this.props.location.state.item) {
      let item = this.props.location.state.item
      this.getMusicList(item.id)
      this.setState(() => ({
        singer: item
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
        ret.push(CreateSong(musicData))
      }
    })
    return ret
  }

  back = () => {
    this.setState(() => ({
      show: false
    }), () => {
      setTimeout(() => {
        this.props.history.push('/singer')
      }, 300)
    })
  }


  render() {
    return (
      <CSSTransition
        in={this.state.show}
        key={this.props.match.params.id}
        timeout={300}
        className="slide singer-details"
      >
        <div>
          <MusicList back={this.back} singer={this.state.singer} songList={this.state.songList}/>
        </div>
      </CSSTransition>
    )
  }
}

export default SingerDetail
