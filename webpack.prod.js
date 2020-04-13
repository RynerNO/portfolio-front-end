const merge = require('webpack-merge');
const dev = require('./webpack.common.js');
const path = require('path');
module.exports = merge(dev, {
  mode: 'production',
  entry: ['./client/app.js'],
  output: {
    filename: 'app.js',
    publicPath: '/',
 
  },
});