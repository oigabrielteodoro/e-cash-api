import { Segments, celebrate } from 'celebrate'

export const validBySchema = <T>(schema: T, segment: Segments) => {
  return celebrate({
    [segment]: schema,
  })
}

export const validBodyBySchema = <T>(schema: T) =>
  validBySchema(schema, Segments.BODY)

export const validParamsBySchema = <T>(schema: T) =>
  validBySchema(schema, Segments.PARAMS)

export function removeUndefinedValuesInObject<T, E>(receivedBody: T): E {
  return JSON.parse(JSON.stringify(receivedBody))
}
