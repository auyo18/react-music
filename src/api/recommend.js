import request from '../utils/request'
import {baseParams} from "../config"

export const recommendList = () => (
  request({
    url: '/cApi/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
    method: 'get',
    params: Object.assign({
      ein: 29,
      categoryId: 10000000
    }, baseParams)
  })
)

export const recommendSlider = () => (
  request({
    url: '/cApi/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    method: 'get',
    params: Object.assign({}, baseParams)
  })
)

export const discList = disstid => (
  request({
    url: '/cApi/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    method: 'get',
    params: Object.assign({
      disstid,
      type: 1
    }, baseParams)
  })
)
