/**
 * Request handling application logic.
 */
const { parse } = require('url')
const { StringDecoder } = require('string_decoder')

// All available handlers
const handlers = {
  // default route handler
  notFound(_, respond) {
    respond(404)
  },

  // respond with current server date time
  now(data, respond) {
    respond(200, {
      message: `Hi there!`,
      now: new Date().toISOString()
    })
  }
}

// Routes configuration
const routes = {
  hello: handlers.now
}

module.exports = (req, res) => {
  // extract data from request
  const { url, method, headers } = req

  // extract data from url
  const { pathname, query } = parse(url, true)
  const path = pathname.replace(/^\/+|\/+$/g, '')

  // collect payload though we don't use it now
  const decoder = new StringDecoder('utf-8')
  let payload = ''
  req.on('data', data => {
    payload += decoder.write(data)
  })

  req.on('end', () => {
    // flush internal decoder buffer
    payload += decoder.end()

    // prepare data object
    const data = {
      path,
      query,
      method,
      headers,
      payload
    }

    // select a handler based on path or use notFound handler
    const handler = routes[path] || handlers.notFound

    // invoke handler
    handler(data, (statusCode = 200, payload = {}) => {
      // set we always respond w/ json
      res.setHeader('Content-Type', 'application/json')

      // write HTTP head
      res.writeHead(statusCode)

      // end response stream w/ stringified payload
      res.end(JSON.stringify(payload))
    })
  })
}
