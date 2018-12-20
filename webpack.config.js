const path = require('path')
const webpack = require('webpack')

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: "./js/root.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
    chunkFilename: '[name]-[id].[chunkhash:8].bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      { test: /\.(jpeg|jpg|png|gif)$/, loader: 'url-loader?limit=10240' },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}

module.exports = env => {
  console.log('env1',env)
  if(env === 'production') {
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  if(env === 'development') {
    config.plugins.push(new webpack.optimize.DedupePlugin())
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        'screw_ie8': true,
        'warnings': false,
        'unused': true,
        'dead_code': true,
      }
    }))
  }
  return config
}
