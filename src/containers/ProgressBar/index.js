import React, {PureComponent} from 'react'

class ProgressBar extends PureComponent {
  constructor(props) {
    super(props)
    this.touch = {}
    this.progress = {}
  }

  componentDidMount() {
    this.progress.BtnWidth = this.refs.progressBtn.clientWidth
    this.progress.BarWidth = this.refs.progressBar.clientWidth - this.progress.BtnWidth
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setProgress(this.progress.BarWidth * nextProps.percent)
  }

  setProgress = progressWidth => {
    this.refs.progress.style.width = progressWidth + 'px'
    this.refs.progressBtnWP.style.left = progressWidth + 'px'
  }

  progressTouchStart = e => {
    this.touch.initiated = true
    this.touch.startX = e.touches[0].pageX
    this.touch.progressWidth = this.refs.progress.clientWidth
  }

  progressTouchMove = e => {
    if (!this.touch.initiated) return
    const delta = e.touches[0].pageX - this.touch.startX
    const newWidth = Math.min(this.progress.BarWidth, Math.max(0, this.touch.progressWidth + delta))
    this.setProgress(newWidth)
    this.props.changeProgressBarMoveState(true)
  }

  progressTouchEnd = () => {
    this.touch.initiated = false
    this.props.changeProgressBarMoveState(false)
    const time = this.refs.progress.clientWidth / this.progress.BarWidth * this.props.interval
    this.props.updateSongTime(time)
    if (!this.props.playing) {
      this.props.setPlayingState(true)
    }
  }

  progressClick = e => {
    const rect = this.refs.progressBar.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left - this.progress.BtnWidth
    this.setProgress(offsetWidth)
    this.props.updateSongTime(offsetWidth / this.progress.BarWidth * this.props.interval)
  }

  render() {
    return (
      <div className="progress-bar" ref="progressBar" onClick={this.progressClick}>
        <div className="bar-inner">
          <div className="progress" ref="progress" />
          <div
            className="progress-btn-wrapper"
            ref="progressBtnWP"
            onTouchStart={this.progressTouchStart}
            onTouchMove={this.progressTouchMove}
            onTouchEnd={this.progressTouchEnd}
          >
            <div className="progress-btn" ref="progressBtn" />
          </div>
        </div>
      </div>
    )
  }
}

export default ProgressBar
