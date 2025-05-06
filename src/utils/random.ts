export function getRandomHexadecimal(): string {
  let randomHex = ''
  for (let i = 0; i < 16; i++) {
    const randomNum = Math.floor(Math.random() * 16)
    randomHex += randomNum.toString(16)
  }
  return randomHex
}
