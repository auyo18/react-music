import React, {Component} from 'react'
import {connect} from "react-redux"
import Slider from '../../containers/Slider'
import Scroll from '../../containers/Scroll'
import {getRecommendList, getRecommendSlider} from "./store/actions"
import './index.scss'

class Recommend extends Component {
  componentWillMount() {
    !this.props.recommendSlider.size && this.props.getRecommendSlider()
    !this.props.recommendList.size && this.props.getRecommendList()
  }

  render() {
    this.container = (
        <div className="recommend">
          <Scroll className="recommend-content">
            <div>
              <div className="slider-wrapper">
                {
                  // 当 slider 有数据后再渲染 Slider组件
                  this.props.recommendSlider.size > 0 &&
                  <Slider>
                    {
                      this.props.recommendSlider.map(slider => (
                          <div key={slider.get('id')}>
                            <img src={slider.get('picUrl')} alt="" />
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
                        <dl key={item.get('dissid')}>
                          <img src={item.get('imgurl')} alt="" />
                          <dt>{item.get('dissname')}</dt>
                          <dd>{item.getIn(['creator', 'name'])}</dd>
                        </dl>
                    ))
                  }
                </div>
              </div>
            </div>
          </Scroll>
        </div>
    )
    return this.container
  }
}

const mapStateToProps = state => {
  return {
    recommendSlider: state.getIn(['recommend', 'slider']),
    recommendList: state.getIn(['recommend', 'list'])
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
