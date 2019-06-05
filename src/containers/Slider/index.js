import React, {Component} from 'react'
import BetterScroll from 'better-scroll'
import {addClass} from "../../utils/dom"
import './index.scss'

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dots: [],
      currentPageIndex: 0
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setSliderWidth()
      this.initDots()
      this.initSlider()
      this.props.autoPlay && this.play()
    }, 20)

    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    this.slider.disable()
    clearTimeout(this.timer)
    window.removeEventListener('resize', this.resize)
  }

  setSliderWidth = (isResize) => {
    this.children = this.refs.sliderGroup.children
    this.sliderLength = this.children.length
    let width = 0
    let sliderWidth = this.refs.slider.clientWidth
    for (let i = 0; i < this.sliderLength; i++) {
      let child = this.children[i]
      addClass(child, 'slider-item')
      child.style.width = sliderWidth + 'px'
      width += sliderWidth
    }

    if (this.props.loop && !isResize) {
      width += 2 * sliderWidth
    }

    this.refs.sliderGroup.style.width = width + 'px'
  }

  initDots = () => {
    let dots = []
    for (let i = 0; i < this.sliderLength; i++) {
      dots.push(0)
    }
    this.setState(() => ({
      dots
    }))
  }

  initSlider = () => {
    this.slider = new BetterScroll(this.refs.slider, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.props.loop,
        threshold: 0.3
      }
    })

    this.slider.on('scrollEnd', () => {
      let pageIndex = this.slider.getCurrentPage().pageX
      this.setState(() => ({
        currentPageIndex: pageIndex
      }))

      if (this.props.autoPlay) {
        clearTimeout(this.timer)
        this.play()
      }
    })
  }

  play = () => {
    let pageIndex = (this.state.currentPageIndex + 1) % this.sliderLength
    this.timer = setTimeout(() => {
      this.slider.goToPage(pageIndex, 0, 400)
    }, this.props.interval)
  }

  resize = () => {
    if (!this.slider) return
    this.setSliderWidth(true)
    this.slider.refresh()
  }

  render() {
    return (
        <div className="slider" ref="slider">
          <div className="slider-group" ref="sliderGroup">
            {
              this.props.children
            }
          </div>
          <div className="dots">
            {
              this.state.dots.map((dot, index) => (
                  <span key={index} className={`dot ${this.state.currentPageIndex === index ? 'active' : ''}`} />
              ))
            }
          </div>
        </div>
    )
  }
}

Slider.defaultProps = {
  loop: true,
  autoPlay: true,
  interval: 4000
}

export default Slider
