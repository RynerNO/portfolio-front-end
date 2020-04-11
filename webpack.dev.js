require('dotenv').config();

const path = require('path');
const Webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?reload=true', './client/app.js'],
  output: {
    filename: 'app.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'server/public')
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()
   ]
};
