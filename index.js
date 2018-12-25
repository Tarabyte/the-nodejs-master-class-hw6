/**
 * Starts a http server that implements /hello API
 */
const { createServer } = require('http')

// import request handler
const app = require('./app')
// import port from the config
const { PORT, envName } = require('./config')

createServer(app).listen(PORT, err => {
  if (err) {
    // unable to start http server
    // notify user
    console.error(`Unable to start server on PORT ${port} due to ${err}`, err)

    // quit the process indicating we failed
    process.exit(-1)
  }

  console.log(
    `Hello API is up and running http://localhost:${PORT} in ${envName} mode.`
  )
})
