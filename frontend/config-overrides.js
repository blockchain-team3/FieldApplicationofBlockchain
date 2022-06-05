/* eslint-disable */
/* config-overrides.js */

const webpack = require('webpack')

module.exports = function override(config, env) {
  return {
    ...config,
    plugins: [
        ...config.plugins,
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    resolve: {
      ...config.resolve,
      fallback: {
        fs: false,
        net: false,
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        // url: require.resolve('url'),
        assert: require.resolve('assert/')
      }
    }
  }
}
