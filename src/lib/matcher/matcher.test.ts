import { isContains } from './matcher'

describe('matcher', () => {
  it('should be able return true if object has params values', () => {
    const user = {
      name: 'Example',
      email: 'example@main.com',
      password: '123456',
    }

    const params = {
      name: 'Example',
      email: 'example@main.com',
    }

    expect(isContains(user, params)).toBe(true)
  })

  it("should be able return false if object hasn't params values", () => {
    const user = {
      name: 'Example',
      email: 'example@main.com',
      password: '123456',
    }

    const params = {
      name: 'wrong-name',
      email: 'example@main.com',
    }

    expect(isContains(user, params)).toBe(false)
  })

  it("should be able return true if value doesn't an object and value is equal with params", () => {
    expect(isContains('Example', 'Example')).toBe(true)
  })

  it("should be able return false if value doesn't an object and value don't equal the params", () => {
    expect(isContains('Example', 'wrong-param')).toBe(false)
  })
})
