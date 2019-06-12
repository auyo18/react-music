const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 数组打乱顺序
export const shuffle = arr => {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomInt(0, i);
    [_arr[i], _arr[j]] = [_arr[j], _arr[i]]
  }
  return _arr
}

export const addZero = num => {
  if (num < 10) {
    return '0' + num
  }
  return num
}
