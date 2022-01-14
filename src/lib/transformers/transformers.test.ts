import { isValidNumber, transformStringToInt } from '.'

describe('transformers', () => {
  describe('transformStringToInt', () => {
    it('should be able transform correctly', () => {
      const value = transformStringToInt('1000.01')

      expect(value).toBe(1000.01)
    })
  })

  describe('isValidNumber', () => {
    it('should be able return true when number is valid', () => {
      expect(isValidNumber('1000.01')).toBeTruthy()
    })

    it('should be able return false when number is invalid', () => {
      expect(isValidNumber('wrong-number')).toBeFalsy()
    })
  })
})
