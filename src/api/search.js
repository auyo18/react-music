import request from '../utils/request'
import {baseParams} from "../config"

export const getSearchSongs = (keyword, page) => request({
  url: '/cApi/soso/fcgi-bin/client_search_cp',
  method: 'get',
  params: Object.assign({}, baseParams, {
    w: keyword,
    catZhida: 1,
    p: page,
    new_json: 1
  })
})

export const getHotKey = () => request({
  url: '/cApi/splcloud/fcgi-bin/gethotkey.fcg',
  method: 'get'
})
