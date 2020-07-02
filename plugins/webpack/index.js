const { onFileDefaultPreprocessor } = require('../../preprocessor/webpack')

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  on('file:preprocessor', onFileDefaultPreprocessor(config))

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
