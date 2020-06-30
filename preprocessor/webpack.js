const webpack = require('webpack')
const util = require('util')

// Cypress webpack bundler adaptor
// https://github.com/cypress-io/cypress-webpack-preprocessor
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const debug = require('debug')('cypress-vue-unit-test')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const fw = require('find-webpack')
const webpackOptions = fw.getWebpackOptions()

// Preventing chunks because we don't serve static assets
function preventChunking (options = {}) {
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

// Base 64 all the things because we don't serve static assets
function inlineUrlLoadedAssets (options = {}) {
  const isUrlLoader = use => use.loader.indexOf('url-loader') > -1
  const mergeUrlLoaderOptions = use => {
    if (isUrlLoader(use)) {
      use.options = use.options || {}
      use.options.limit = Number.MAX_SAFE_INTEGER
    }
    return use
  }

  if (options.module && options.module.rules) {
    options.module.rules = options.module.rules.map(rule => {
      if (rule.use) {
        rule.use = rule.use.map(mergeUrlLoaderOptions)
      }
      return rule
    })
  }
  return options
}

function compileTemplate (options = {}) {
  options.resolve = options.resolve || {}
  options.resolve.alias = options.resolve.alias || {}
  options.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
}

/**
 * Warning: modifies the input object
 */
function insertBabelLoader(options) {
  options.devtool = '#eval-source-map'

  options.module.rules.push({
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      plugins: [
        // this plugin allows ES6 imports mocking
        [
          '@babel/plugin-transform-modules-commonjs',
          {
            loose: true,
          }
        ],
        // this plugin instruments the loaded code
        // which allows us to collect code coverage
        'babel-plugin-istanbul'
      ]
    },
  })

  options.plugins = options.plugins || []
  options.plugins.push(
    new VueLoaderPlugin()
  )
}

inlineUrlLoadedAssets(webpackOptions)
preventChunking(webpackOptions)
compileTemplate(webpackOptions)
insertBabelLoader(webpackOptions)

if (debug.enabled) {
  console.error('final webpack')
  console.error(util.inspect(webpackOptions, false, 10, true))
}

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
