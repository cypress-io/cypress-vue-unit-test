const webpack = require('webpack')

// Cypress webpack bundler adaptor
// https://github.com/cypress-io/cypress-webpack-preprocessor
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

const fw = require('find-webpack')
const webpackOptions = fw.getWebpackOptions()

// Preventing chunks because we don't serve static assets
function preventChunking (options) {
  if (options && options.optimization && options.optimization.splitChunks) {
    delete options.optimization.splitChunks
  }
  options.plugins = options.plugins || []
  options.plugins.push(
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1 // no chunks from dynamic imports -- includes the entry file
    })
  )
  return options
}

preventChunking(webpackOptions)

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
    webpackOptions,
  })
}

module.exports = { onFilePreprocessor, onFileDefaultPreprocessor }
