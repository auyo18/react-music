export default class CreateSinger {
  constructor({id, name, avatar}) {
    this.id = id
    this.name = name
    this.avatar = avatar.replace('webp', 'jpg')
  }
}

export class Song {
  constructor({id, mid, name, album, albummid, singer, interval, vkey}) {
    this.id = id
    this.mid = mid
    this.name = name
    this.album = album
    this.singer = handleSinger(singer)
    this.interval = interval
    this.image = albummid.trim() ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000` : ''
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
    return '1CB19A24BC53F2ED609211DDDF665BC6FA2AC3AEF2EB3D34C430F36FF1C4902EAE70B3B4226A8BDF71C50699FD07614DC985C4C0BF244D00'
  }
  return vkey[Math.round(Math.random() * vkey.length)]
}

export const CreateSong = musicData => {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.songname,
    album: musicData.albumname,
    albummid: musicData.albummid,
    singer: musicData.singer,
    interval: musicData.interval
  })
}
