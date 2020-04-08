// Cypress webpack bundler adaptor
// https://github.com/cypress-io/cypress-webpack-preprocessor
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

const fw = require('find-webpack')
const webpackOptions = fw.getWebpackOptions()

// TODO: Figure out how to handle dynamic imports
// Vue CLI's optimization and bundle splitting breaks Cypress
// but it's necessary for <router-link> lazy loading...
// and likely other dynamic imports
delete webpackOptions.optimization

/**
 * Basic Cypress Vue Webpack file loader for .vue files
 */
const onFileDefaultPreprocessor = webpackPreprocessor({ webpackOptions })

/**
 * Custom Vue loader from the client projects that already have `webpack.config.js`
 *
 * @example
 *    const {
 *      onFilePreprocessor
 *    } = require('cypress-vue-unit-test/preprocessor/webpack')
 *    module.exports = on => {
 *      on('file:preprocessor', onFilePreprocessor('../path/to/webpack.config'))
 *    }
 */
const onFilePreprocessor = webpackOptions => {
  if (typeof webpackOptions === 'string') {
    // load webpack config from the given path
    webpackOptions = require(webpackOptions)
  }

  return webpackPreprocessor({
    webpackOptions
  })
}

module.exports = { onFilePreprocessor, onFileDefaultPreprocessor }
