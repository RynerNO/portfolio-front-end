require('dotenv').config();

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpack = require('webpack');
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['webpack-hot-middleware/client?reload=true', './client/app.js'],
  output: {
    filename: 'app.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'server/public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,

        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.vue$/,

        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          {loader: 'sass-loader',
          options: {
            implementation: require('sass')
          }}
        ]
      }
    ]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(), new VueLoaderPlugin()]
};
