const webpack = require('webpack')

const nodeExternals = require('webpack-node-externals')

const BabiliPlugin = require('babili-webpack-plugin')

module.exports = env => {
  const devMode = env !== 'production'
  const config = {
    entry: ['babel-polyfill', './src'],
    output: {
      path: __dirname + '/dist',
      filename: 'index.js'
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    devtool: devMode ? 'source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(wav|pcm)$/,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(devMode ? 'development' : 'production')
        }
      }),
      !devMode ? new BabiliPlugin() : () => undefined,
      devMode ? new webpack.BannerPlugin({
        banner: `require('source-map-support').install();`,
        raw: true
      }) : () => undefined
    ]
  }

  return config
}
