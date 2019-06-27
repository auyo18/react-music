export const songmid = ['001Qu4I30eVFYb', '000Qepff3UyUWO', '001TXSYu1Gwuwv', '001CG3wA3QkuJS', '004dADLe4ec8RG', '004VBMk71TdUuR', '000QwTVo0YHdcP', '002BWGZQ2UKjKn', '003v4UL61IYlTY', '001hUNRP0P8g7x', '001uxKNp3a7Qkv', '002lSUhO4Z4J1o', '003RCA7t0y6du5', '001RlxZp1xwoNK', '000ssz152QNOHo', '004PTqgl1ctBPM', '0032ZOkm0LBgHW', '003ouHMP12glVD', '003EKHdv2KvTc6', '003TfyNp47dm7E', '003FFWnA3AIczD', '000QCwge3B6Ad1', '000fcbn33tw0lQ', '0047VwdV487b7t', '0024vbNZ4bQz74', '0025bbhu4ZKGnF', '0028TjDC1vC6xv', '002iXagj0UzwdL', '000yvCNX1ABNS2', '000hcT5L3qazwZ', '0026DBoG28Y4Hz', '003uIckZ4ZP87A', '0031mRtD35QuPt', '0033grab0nD7ii', '002R8ZSu4Uvo27', '003h5qZ42kQkyH', '002s96Ny4dZIU1', '003uG1en00qJ9Z', '001sBy9d0RzXkR', '0024RfJA4dFO9I', '000ljlsv1PdzCn', '001nyZbY3ky9cb', '000N8j7K1Z0ap5', '002Eg7sW1b7tAr', '003OzOL91wmpPL', '003BkX6r1Ay0uC', '0022VCY125pxlH', '002O3A8O1I9gdZ', '004TZWVR2yuzCI', '001mVT2H0kTW0R']

let songtype = []
for (let i = 0; i < 50; i++) {
  songtype.push(0)
}

export {songtype}

export const baseParams = {
  format: 'json',
  inCharset: 'utf-8',
  g_tk: 371293658,
  outCharset: 'utf-8',
  notice: 0,
  platform: 'h5',
  needNewCode: 1
}

export const playMode = [
  {
    code: 0,
    name: 'sequence',
    title: '顺序播放',
    icon: 'iconxunhuanbofang'
  },
  {
    code: 1,
    name: 'loop',
    title: '单曲循环',
    icon: 'icondanquxunhuan'
  },
  {
    code: 2,
    name: 'random',
    title: '随机播放',
    icon: 'iconsuijibofang'
  },
]

export const storageKey = {
  PLAY_HISTORY_KEY: '__PLAY__',
  FAVORITE_LIST_KEY: '__FAVORITE__'
}
