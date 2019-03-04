const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader:'babel-loader',
          options: { presets: ["@babel/react","@babel/preset-env"] }
        }],
        exclude: /node_modules/
      },
      { test: /\.(jpeg|jpg|png|gif)$/, use: 'url-loader?limit=10240' },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ]
}

module.exports = env => {
  if(env === 'development') {
    console.log('config development')
    config.entry =  ['webpack-hot-middleware/client?noInfo=true&reload=true', './js/root.js']
    config.mode = 'development'
    config.devtool = 'cheap-module-eval-source-map'
    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
  }
  if(env === 'production') {
    console.log('config production')
    config.entry =  ['./js/root.js']
    config.mode = 'production'
    config.optimization = {
      minimize: true
    }
  }
  return config
}
