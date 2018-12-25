/**
 * Loading env variables from .env.*.json files
 */
const { existsSync, readFileSync } = require('fs')

/**
 * Reads env specific json file
 */
const loadEnv = name => {
  const filename = `.env${name ? `.${name}` : ''}.json`

  // check there is a file named .env.<name>.json
  if (!existsSync(filename)) {
    if (name) {
      console.warn(
        `Unknown env name "${name}". No corresponding config file "${filename}" was found.`
      )
    }

    // nothing there return empty object
    return {}
  }

  // read file contents
  const envData = readFileSync(filename)

  // and parse it
  return JSON.parse(envData)
}

// infer environment name from NODE_ENV or default to staging
const envName = (process.env.NODE_ENV || 'staging').toLowerCase()

module.exports = Object.assign(
  {
    envName
  },
  loadEnv(), // default .env.json if any
  loadEnv(envName) // NODE_ENV specific file
)
