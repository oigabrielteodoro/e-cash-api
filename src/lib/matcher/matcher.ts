export function isObject(value: unknown): value is Object {
  return typeof value === 'object'
}

export function isContains(valueToCompare: unknown, params: unknown) {
  if (isObject(valueToCompare)) {
    const paramsEntries = Object.entries(params)

    const expectedResult = paramsEntries.length
    let foundResult = 0

    Object.entries(valueToCompare).forEach((entry) => {
      const isFounded = paramsEntries.find(
        (paramEntry) =>
          paramEntry[0] === entry[0] && paramEntry[1] === entry[1],
      )

      if (isFounded) {
        foundResult++
      }
    })

    return expectedResult === foundResult
  }

  return valueToCompare === params
}
