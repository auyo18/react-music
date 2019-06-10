import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import Slider from '../../containers/Slider'
import Scroll from '../../containers/Scroll'
import {getRecommendList, getRecommendSlider} from "./store/actions"
import './index.scss'

class Recommend extends PureComponent {
  componentWillMount() {
    !this.props.recommendSlider.length && this.props.getRecommendSlider()
    !this.props.recommendList.length && this.props.getRecommendList()
  }

  render() {
    return (
      <div className="recommend scroll-view">
        <Scroll className="scroll-content" data={this.props.recommendSlider}>
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
                    <dl key={item.dissid}>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recommendSlider: state.recommend.slider,
    recommendList: state.recommend.list
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
