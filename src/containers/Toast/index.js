import React, {PureComponent} from 'react'
import './index.scss'

class Toast extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.title !== this.props.title) {
      this.setState(() => ({
        show: true
      }), () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.setState(() => ({
            show: false
          }))
        }, this.props.time)
      })
    }
  }

  render() {
    return (
      <div className={`toast-container ${this.state.show ? 'show' : 'hide'}`}>
        <div className="toast">
          <p className="desc">{this.props.title}</p>
        </div>
      </div>
    )
  }
}

Toast.defaultProps = {
  title: '提示...',
  time: 2000
}

export default Toast
