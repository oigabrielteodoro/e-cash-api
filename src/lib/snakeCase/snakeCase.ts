import snakeCaseKeys from 'snakecase-keys'

export function toSnakeCase(value: string) {
  const valueWithSpaceInUppercaseCharacter = value.replace(/([A-Z])/g, ' $1')

  return valueWithSpaceInUppercaseCharacter.split(' ').join('_').toLowerCase()
}

export function toSnakeCaseWithObject<T>(value: T) {
  return snakeCaseKeys(value, {
    deep: true,
  })
}
