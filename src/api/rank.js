import request from "../utils/request"
import {baseParams} from "../config"

export const topList = () => request({
  url: '/cApi/v8/fcg-bin/fcg_myqq_toplist.fcg',
  method: 'get',
  params: Object.assign({}, baseParams)
})

export const rankSong = topid => request({
  url: '/cApi/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
  method: 'get',
  params: Object.assign({}, baseParams,{topid})
})
