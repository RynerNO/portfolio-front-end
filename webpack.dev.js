require('dotenv').config();

const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const dev = require('./webpack.common.js');
module.exports = merge(dev, {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?reload=true', './src/client/app.js'],
  output: {
    filename: 'app.js',
    publicPath: '/',
    
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()
  ],
  module: {
   
    rules: [
      {
        test: /\.js$/,

        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/,
      },
    ]
  }
})
