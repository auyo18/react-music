import React, {PureComponent} from 'react'
import Switches from '../../containers/Switches'
import './index.scss'

class User extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      switches: ['我喜欢的', '最近听的'],
      switchIndex: 0
    }
  }

  changeSwitchIndex = index => {
    this.setState(() => ({
      switchIndex: index
    }))
  }

  render() {
    return (
      <div className="user-wrapper">
        <Switches
          switches={this.state.switches}
          currentIndex={this.state.switchIndex}
          changeSwitchIndex={this.changeSwitchIndex}/>
        <div className="play-btn">
          <i className="iconfont iconsuijibofang"/>
          <span>随机播放全部</span>
        </div>
      </div>
    )
  }
}

export default User
