import camelcaseKeys from 'camelcase-keys'

export function camelCaseFromObject<T>(value: T) {
  return camelcaseKeys(value, {
    deep: true,
  })
}
