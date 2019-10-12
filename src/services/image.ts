import { Image } from 'react-native'

// MEMO: Image.getSizeをasync-awaitで使えるようラップしている。
const _getSize = (url: string) => {
  return new Promise<{ width?: number; height?: number; error?: Error }>(resolve => {
    Image.getSize(url, (width, height) => resolve({ width, height }), error => resolve({ error }))
  })
}

const _gcd: (x: number, y: number) => number = (x, y) => {
  const rx = Math.round(x)
  const ry = Math.round(y)

  if (ry === 0) return rx
  return _gcd(ry, rx % ry)
}

export const getSize = async (url: string) => {
  const { width, height, error } = await _getSize(url)

  if (error) {
    return { error }
  }

  return { width, height }
}

export const getAspect = async (url: string) => {
  const { width, height, error } = await _getSize(url)

  if (error) {
    return { error }
  }

  const num = _gcd(width, height)

  return { aspect: [width / num, height / num] }
}
