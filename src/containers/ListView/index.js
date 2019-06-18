import React, {PureComponent} from 'react'
import Scroll from "../Scroll"
import {getData} from "../../utils/dom"
import './index.scss'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 41

class ListView extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: -1,
      currentIndex: 0
    }
    this.touch = {}
    this.listenScroll = true
    this.probeType = 3
    this.timer = null
  }

  componentDidMount() {
    this.calculateHeight()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.calculateHeight()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  selectItem = item => {
    this.props.selectItem(item)
  }

  onShortCutTouchStart = e => {
    e.stopPropagation()
    let anchorIndex = getData(e.target, 'index')
    let firstTouch = e.touches[0]
    this.touch.y1 = firstTouch.pageY
    this.touch.anchorIndex = anchorIndex
    this.scrollTo(anchorIndex)
    this.showTip(this.touch.y1)
  }
  onShortCutTouchMove = e => {
    e.stopPropagation()
    let firstTouch = e.touches[0]
    let length = this.listHeight.length
    this.touch.y2 = firstTouch.pageY
    let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
    let anchorIndex = this.touch.anchorIndex * 1 + delta
    this.scrollTo(anchorIndex)
    if (anchorIndex > 0 && anchorIndex <= length - 2) {
      this.showTip(this.touch.y2)
    }
  }

  onShortcutTouchEnd = e => {
    e.stopPropagation()
    this.hideTip()
  }

  showTip = y => {
    this.refs.tip.style.opacity = 1
    this.refs.tip.style.top = y - 25 + 'px'
  }

  hideTip = () => {
    this.refs.tip.style.opacity = 0
  }

  scrollTo = index => {
    if (!index && index !== 0) {
      return
    }
    if (index < 0) {
      index = 0
    } else if (index > this.listHeight.length - 2) {
      index = this.listHeight.length
    }
    this.refs.singerList.scrollToElement([this.refs.singerListView.children[index], 0])
  }

  scroll = pos => {
    let y = pos.y
    if (y > 0) {
      this.fixedHide()
    } else {
      this.fixedShow()
    }

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const listHeight = this.listHeight
      const len = listHeight.length
      if (y > 0) {
        this.setState(() => ({
          currentIndex: 0
        }))
        return
      }
      for (let i = 0; i < len - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-y >= height1 && -y < height2) {
          if (this.state.currentIndex !== i) {
            this.setState(() => ({
              currentIndex: i
            }))
          }
          this.diff(height2 + y)
          return
        }
      }
      if (this.state.currentIndex !== len - 2) {
        this.setState(() => ({
          currentIndex: len - 2
        }))
      }
    }, 10)
  }

  calculateHeight = () => {
    this.listHeight = []
    const list = this.refs.singerListView ? this.refs.singerListView.children : []
    let height = 0
    this.listHeight.push(height)
    for (let i = 0, len = list.length; i < len; i++) {
      height += list[i].clientHeight
      this.listHeight.push(height)
    }
  }

  diff = (num) => {
    let fixedTop = (num > 0 && num < TITLE_HEIGHT) ? num - TITLE_HEIGHT : 0
    if (this.fixedTop === fixedTop) {
      return
    }
    this.fixedTop = fixedTop
    this.refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
  }

  fixedShow = () => {
    this.refs.fixed.style.display = null
  }

  fixedHide = () => {
    this.refs.fixed.style.display = 'none'
  }

  render() {
    return (
      <Scroll
        className="singer-list"
        ref="singerList"
        listenScroll={this.listenScroll}
        probeType={this.probeType}
        data={this.props.singerList}
        scroll={pos => {
          this.scroll(pos)
        }}>
        <div ref="singerListView">
          {this.props.singerList.map(item => (
            <dl key={item.title} className="group" ref="listGroup">
              <dt className="group-title">
                {item.title}
              </dt>
              <dd>
                {
                  item.items.map(item => (
                    <dl className="singer-info" key={item.id} onClick={() => {
                      this.selectItem(item)
                    }}>
                      <dt>
                        <img src={item.avatar} alt=""/>
                      </dt>
                      <dd>{item.name}</dd>
                    </dl>
                  ))
                }
              </dd>
            </dl>
          ))}
        </div>
        <div
          className="short-cut"
          onTouchStart={this.onShortCutTouchStart}
          onTouchMove={this.onShortCutTouchMove}
          onTouchEnd={this.onShortcutTouchEnd}>
          {
            this.props.shortCutList.map((short, index) => (
              <dl key={short}>
                <dd
                  data-index={index}
                  className={this.state.currentIndex === index ? 'active' : ''}>
                  {short.substr(0, 1)}
                </dd>
              </dl>
            ))
          }
        </div>
        <div className="tip" ref="tip">
          {
            this.props.shortCutList.length && this.props.shortCutList[this.state.currentIndex].substr(0, 1)
          }
        </div>
        <div className="list-fixed" ref="fixed">
          {
            (this.props.shortCutList.length > 0 && this.props.shortCutList[this.state.currentIndex]) || '聚力'
          }
        </div>
      </Scroll>
    )
  }
}

export default ListView
