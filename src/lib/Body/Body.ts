export function convertBodyFromUndefined<T, E>(receivedBody: T): E {
  return JSON.parse(JSON.stringify(receivedBody))
}
