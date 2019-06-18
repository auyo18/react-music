import request from '../utils/request'
import {baseParams} from "../config"

export const singerList = () => request({
  url: '/uApi/cgi-bin/musicu.fcg',
  method: 'get',
  params: Object.assign({}, baseParams, {
    data: {
      "comm": {"ct": 24, "cv": 0},
      "singerList": {
        "module": "Music.SingerListServer",
        "method": "get_singer_list",
        "param": {"area": -100, "sex": -100, "genre": -100, "index": -100, "sin": 0, "cur_page": 1}
      }
    }
  })
})

export const singerMusicList = singermid =>request({
  url: '/cApi/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
  method: 'get',
  params: Object.assign({}, baseParams, {
    singermid,
    order: 'listen',
    begin: 0,
    num: 50
  })
})
