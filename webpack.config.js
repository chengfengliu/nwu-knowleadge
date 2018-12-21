const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: "./js/root.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
    chunkFilename: '[name].bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './views/index.html',
      title: 'test'
    })
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
  if(env === 'development') {
    console.log('config development')
    config.devtool = 'cheap-module-eval-source-map'
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  if(env === 'production') {
    console.log('config production')
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
