/**
 * Starts a http server that implements /hello API
 */
const { createServer } = require('http')
const { isMaster, fork } = require('cluster')
const cpus = require('os').cpus().length

// import request handler
const app = require('./app')
// import port from the config
const { PORT, envName } = require('./config')

if (isMaster) {
  console.log(`Spawning ${cpus} workers`)

  Promise.all(
    Array.from({ length: cpus }, (_, i) => {
      console.log(`Starting a worker ${i}`)

      const worker = fork()

      return new Promise((resolve, reject) => {
        worker.once('error', reject)

        // listen to up message indicating the worker process has done all the async work to start
        worker.once('message', up => up === 'up' && resolve(worker))
      })
    })
  ).then(() => {
    // when all workers are up, notify user
    console.log(
      `Hello API is up and running http://localhost:${PORT}/hello in ${envName} mode.`
    )
  })
} else {
  createServer(app).listen(PORT, err => {
    if (err) {
      // unable to start http server
      // notify user
      console.error(`Unable to start server on PORT ${port} due to ${err}`, err)

      // quit the process indicating we failed
      process.exit(-1)
    }

    console.log(`Worker ${process.pid} is running`)
    // notify master we up and running
    process.send('up')
  })
}
