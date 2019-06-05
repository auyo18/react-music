import React, {Component} from 'react'
import BetterScroll from 'better-scroll'

class Scroll extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.initScroll()
    }, 20)

    window.addEventListener('scroll', () => {
      console.log(123)
    })
  }

  initScroll = () => {
    if (!this.refs.wrapper) return
    this.scroll = new BetterScroll(this.refs.wrapper, {
      probeType: this.props.probeType,
      click: this.props.click
    })
  }

  enable = () => {
    this.scroll && this.scroll.enable()
  }

  disable = () => {
    this.scroll && this.scroll.disable()
  }

  refresh = () => {
    this.scroll && this.scroll.refresh()
  }

  render() {
    return (
        <div className={this.props.className} ref="wrapper">
          {
            this.props.children
          }
        </div>
    )
  }
}

Scroll.defaultProps = {
  probeType: 1,
  click: true,
  data: []
}

export default Scroll
