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
    this.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
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
    return '701831C1DBDFEC0CCD9850CF0F6A4F1AA5DDFA2C3899876A1C3DADABF535222F6A9090504EF453F5194103D74A3B5AC2257DCBFF45520FF9'
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
