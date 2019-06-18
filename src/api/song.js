import request from '../utils/request'
import {baseParams} from "../config"

export const getLyric = id => (
  request({
    url: '/cApi/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg',
    method: 'get',
    params: Object.assign({}, baseParams, {
      musicid: id,
      nobase64: 0
    })
  })
)

export const getVKey = (songmid, songtype) => request({
  url: '/uApi/cgi-bin/musicu.fcg',
  method: 'post',
  data: {
    comm:baseParams,
    'req_0': {
      'module': 'vkey.GetVkeyServer',
      'method': 'CgiGetVkey',
      'param': {
        guid: '2355532888',
        loginflag: 0,
        platform: '23',
        'songmid': songmid,
        'songtype': songtype,
        uin: '0'
      }
    }
  }
})
