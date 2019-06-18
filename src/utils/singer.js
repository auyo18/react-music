export default class CreateSinger {
  constructor({id, name, avatar}) {
    this.id = id
    this.name = name
    this.avatar = avatar.replace('webp', 'jpg')
  }
}

export class Song {
  constructor({id, mid, name, album, albummid, singer, interval, vKey}) {
    this.id = id
    this.mid = mid
    this.name = name
    this.album = album
    this.singer = handleSinger(singer)
    this.interval = interval
    this.image = albummid && albummid.trim() ? `//y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000` : ''
    this.url = `//dl.stream.qqmusic.qq.com/C400${mid}.m4a?guid=2355532888&vkey=${getVKey(vKey)}&uin=0&fromtag=38`
  }
}

const handleSinger = singer => {
  if (!singer) {
    return ''
  }
  let ret = singer.map(item => (item.name))
  return ret.join('/')
}

const getVKey = (vKey = []) => {
  if (!vKey.length) {
    return 'EAC99AF8D1286BD965FB261DAB7E38C9BA815F9B6EB56C8591E6157073EDE1BE9F6D5F725CAF39C829095E0652CC0FDF3FAD41CFCB1889A5'
  }
  return vKey[Math.round(Math.random() * (vKey.length - 1))]
}

export const CreateSong = (musicData, vKey) => {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.songname,
    album: musicData.albumname,
    albummid: musicData.albummid,
    singer: musicData.singer,
    interval: musicData.interval,
    vKey
  })
}
