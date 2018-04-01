export function randomNum(length) {
  let str = ''
  for (let i = 0; i < length; i++) {
    str += ~~(Math.random() * 10)
  }
  return str
}