require('dotenv').config();
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackBar = require('webpackbar');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { merge } = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
let config = {
  mode: 'development',
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: "js/[name].[chunkhash:6].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,

        use: [
          'vue-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          }
        ]
      },
      {
        test: /\.sass$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1} },
          'postcss-loader',
          {loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              indentedSyntax: true
            }
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/styles/utils/colors.sass', './src/styles/utils/mixins.sass']
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1} },
          'postcss-loader',
          {loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            }
          },
        ]
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1} },
          'postcss-loader',
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|jpg|pdf|png|svg|webp)([\?]?.*)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[hash].[ext]',
          }
      },
      }
    ]
  },
  plugins: [new VueLoaderPlugin(), new WebpackBar(), new CleanWebpackPlugin({
    cleanAfterEveryBuildPatterns: ['!_redirects']
  }), new HtmlWebpackPlugin({
    template: './src/public/index.html',
    inject: "body"
  }), new MiniCssExtractPlugin({
      filename: "css/[name].[fullhash:8].css",
      chunkFilename: "css/[name].[fullhash:8].css"
  }), new FaviconsWebpackPlugin({
    logo: './src/public/favicon.png',
    outputPath: "assets/"
  }),
  new FriendlyErrorsWebpackPlugin()
],

  devServer: {
    contentBase: path.join(__dirname, 'src/dist'),
    publicPath: process.env.BASE_URL,
    index: './index.html',
    hot: true,
    stats: 'minimal',
    quiet: true,
    overlay: {
      errors: true
    },
    historyApiFallback: true,
  }
};

if(process.env.PRODUCTION == "true") {
  config = merge(config, {
    mode: 'production',
    optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin()
      ]
    }
  }
  )
}

module.exports = config;