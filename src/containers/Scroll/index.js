import React, {Component} from 'react'
import BetterScroll from 'better-scroll'

class Scroll extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.data !== this.props.data) {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }

  initScroll = () => {
    if (!this.refs.wrapper) return
    this.scroll = new BetterScroll(this.refs.wrapper, {
      probeType: this.props.probeType,
      click: this.props.click
    })

    if (this.props.listenScroll) {
      this.scroll.on('scroll', pos => {
        this.props.scroll(pos)
      })
    }
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

  destroy = () => {
    this.scroll && this.scroll.destroy()
  }

  scrollTo = params => {
    if (this.scroll) {
      setTimeout(() => {
        this.scroll.scrollTo(...params)
      }, 100)
    }
  }

  scrollToElement = params => {
    if (this.scroll) {
      setTimeout(() => {
        this.scroll.scrollToElement(...params)
      }, 100)
    }
  }

  componentWillUnmount() {
    this.destroy()
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
  data: [],
  listenScroll: false
}

export default Scroll
