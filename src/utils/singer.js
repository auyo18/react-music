export default class CreateSinger {
  constructor({id, name, avatar}) {
    this.id = id
    this.name = name
    this.avatar = avatar.replace('webp', 'jpg')
  }
}

export class Song {
  constructor({id, mid, name, album, albumid, singer, interval, vkey}) {
    this.id = id
    this.mid = mid
    this.name = name
    this.album = album
    this.singer = handleSinger(singer)
    this.interval = interval
    this.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumid}.jpg?max_age=2592000`
    this.url = `http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?guid=2355532888&vkey=${getVKey(vkey)}&uin=0&fromtag=38`
  }
}

const handleSinger = singer => {
  if (!singer) {
    return ''
  }
  let ret = singer.map(item => (item.name))
  return ret.join('/')
}

const getVKey = vkey => {
  if (!vkey) {
    return '54A885D88833F19EEF3EE24FCE0F53AAB70C1A9DFD765E0C1D8A389D875A6CC153B6D0D77E2DC03655B0DDEB8E9DF9BE833274BFE91204BD'
  }
  return vkey[Math.round(Math.random() * vkey.length)]
}

export const CreateSong = musicData => {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.songname,
    album: musicData.albumname,
    albumid: musicData.albumid,
    singer: musicData.singer,
    interval: musicData.interval
  })
}
