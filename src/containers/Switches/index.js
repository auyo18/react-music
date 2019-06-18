import React, {PureComponent} from 'react'
import './index.scss'

class Switches extends PureComponent {
  selectSwitch = index => {
    this.props.changeSwitchIndex(index)
  }

  render() {
    return (
      <div className="switches">
        {
          this.props.switches.map((item, index) => (
            <div
              className={`switch-item ${this.props.currentIndex === index ? 'active' : ''}`}
              key={item}
              onClick={() => {
                this.selectSwitch(index)
              }}>
              {item}
            </div>
          ))
        }
      </div>
    )
  }
}

export default Switches
