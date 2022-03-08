import { Request, Response, NextFunction } from 'express'
import unless from 'express-unless'

import camelcaseKeys from 'camelcase-keys'

export const transformCamelCase = (options = { deep: true }) => {
  function handleResponse(_: Request, response: Response, next: NextFunction) {
    const json = response.json

    response.json = function parseJson(body: unknown) {
      if (!!body && typeof body === 'object') {
        body = camelcaseKeys(body, options)
      }

      json.call(this, body)
      return response
    }

    next()
  }

  function handleRequest(request: Request, _: Response, next: NextFunction) {
    request.body = camelcaseKeys(request.body, options)
    request.params = camelcaseKeys(request.params, options)
    request.query = camelcaseKeys(request.query, options)

    next()
  }

  handleRequest.unless = unless
  handleResponse.unless = unless

  return [handleResponse, handleRequest]
}
