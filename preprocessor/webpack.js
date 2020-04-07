const webpack = require('webpack')

// Cypress webpack bundler adaptor
// https://github.com/cypress-io/cypress-webpack-preprocessor
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

const fw = require('find-webpack')
const webpackOptions = fw.getWebpackOptions()

if (webpackOptions &&
  webpackOptions.optimization &&
  webpackOptions.optimization.splitChunks) {
  delete webpackOptions.optimization.splitChunks
}
webpackOptions.plugins = webpackOptions.plugins || []
webpackOptions.plugins.push(
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1 // no chunks from dynamic imports -- includes the entry file
  })
)

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
