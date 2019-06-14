import React, {PureComponent} from 'react'
import './index.scss'
import {CSSTransition} from "react-transition-group"
import {discList} from "../../api/recommend"
import MusicList from '../../components/MusicList'
import CreateSinger, {CreateSong} from "../../utils/singer"

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
    if (this.props.location.state && this.props.location.state.item) {
      let item = this.props.location.state.item
      this.getMusicList(item.dissid)
      this.setState(() => ({
        singer: new CreateSinger({
          id: item.dissid,
          name: item.dissname,
          avatar: item.imgurl
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
    this.setState(() => ({
      songList: this.normalizeSongs(cdlist[0].songlist)
    }))
  }

  normalizeSongs = list => {
    let ret = []
    list.forEach(item => {
      ret.push(CreateSong(item))

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
        className="slide disc-details"
      >
        <div>
          <MusicList back={this.back} singer={this.state.singer} songList={this.state.songList}/>
        </div>
      </CSSTransition>
    )
  }
}

export default Disc
