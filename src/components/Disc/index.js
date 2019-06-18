import React, {PureComponent} from 'react'
import {CSSTransition} from "react-transition-group"
import {discList} from "../../api/recommend"
import MusicList from '../../components/MusicList'
import CreateSinger, {CreateSong} from "../../utils/singer"
import {connect} from "react-redux"

class Disc extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      singer: {},
      songList: []
    }
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.disc) {
      let {disc} = this.props.location.state
      this.getMusicList(disc.dissid)
      this.setState(() => ({
        singer: new CreateSinger({
          id: disc.dissid,
          name: disc.dissname,
          avatar: disc.imgurl
        })
      }))
    } else {
      this.props.history.push('/recommend')
    }
  }

  componentDidMount() {
    this.setState(() => ({
      show: true
    }))
  }

  getMusicList = async disstid => {
    let {cdlist} = await discList(disstid)
    if (cdlist.length && cdlist[0].songlist) {
      this.setState(() => ({
        songList: this.normalizeSongs(cdlist[0].songlist)
      }))
    }
  }

  normalizeSongs = list => {
    let ret = []
    list.forEach(item => {
      ret.push(CreateSong(item, this.props.vKey))
    })
    return ret
  }

  back = () => {
    this.setState(() => ({
      show: false
    }), () => {
      setTimeout(() => {
        this.props.history.push('/recommend')
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

export default connect(mapStateToProps, null)(Disc)
