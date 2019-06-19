import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {Route} from 'react-router-dom'
import Slider from '../../containers/Slider'
import Scroll from '../../containers/Scroll'
import {getRecommendList, getRecommendSlider} from "./store/actions"
import Loadable from "react-loadable"
import Loading from "../../containers/Loading"
import './index.scss'

const Disc = Loadable({
  loader: () => import('../Disc'),
  loading: Loading,
  timeout: 10000
})

class Recommend extends PureComponent {
  componentWillMount() {
    !this.props.recommendSlider.length && this.props.getRecommendSlider()
    !this.props.recommendList.length && this.props.getRecommendList()
  }

  componentDidMount() {
    this.setBottom(this.props.playList)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setBottom(nextProps.playList)
  }

  setBottom = playList => {
    this.refs.recommend.style.bottom = playList.length > 0 ? '50px' : ''
  }

  render() {
    return (
      <div className="recommend scroll-view fixed-container" ref="recommend">
        <Scroll className="scroll-content" data={this.props.recommendList}>
          <div>
            <div className="slider-wrapper">
              {
                // 当 slider 有数据后再渲染 Slider组件
                this.props.recommendSlider.length > 0 &&
                <Slider>
                  {
                    this.props.recommendSlider.map(slider => (
                      <div key={slider.id}>
                        <img src={slider.picUrl} alt="" />
                      </div>
                    ))
                  }
                </Slider>
              }
            </div>
            <div className="recommend-list">
              <h2>
                <span>热门歌单</span>
              </h2>
              <div className="list-container">
                {
                  this.props.recommendList.map(item => (
                    <dl key={item.dissid} onClick={() => {
                      this.props.history.push({pathname: `/recommend/${item.dissid}`, state: {disc: item}})
                    }}>
                      <img src={item.imgurl} alt="" />
                      <dt>{item.dissname}</dt>
                      <dd>{item.creator.name}</dd>
                    </dl>
                  ))
                }
              </div>
            </div>
          </div>
        </Scroll>
        <Route path={'/recommend/:id'} exact component={Disc} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recommendSlider: state.recommend.slider,
    recommendList: state.recommend.list,
    playList: state.player.playList
  }
}

const mapDispatchToProps = dispatch => ({
  getRecommendList() {
    dispatch(getRecommendList())
  },
  getRecommendSlider() {
    dispatch(getRecommendSlider())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend)
