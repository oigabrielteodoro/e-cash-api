import { Big } from 'big.js'

export function transformStringToInt(valueInString: string) {
  const value = new Big(valueInString)

  return value.toNumber()
}

export function isValidNumber(valueInString: string) {
  try {
    return !!new Big(valueInString).toNumber()
  } catch {
    return false
  }
}
