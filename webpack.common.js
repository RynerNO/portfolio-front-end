require('dotenv').config();
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
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

        use: [
          'vue-loader',
        ]
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
        test: /\.s[ac]ss$/i,
        exclude: /\.global.scss$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1, modules: true} },
          'postcss-loader',
          {loader: 'sass-loader',
          options: {
            implementation: require('sass')
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./client/styles/utils/colors.scss', './client/styles/utils/mixins.scss']
            },
          },
        ]
      },

      {
        test: /\.global.scss$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1} },
          'postcss-loader',
          {loader: 'sass-loader',
          options: {
            implementation: require('sass')
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./client/styles/utils/colors.scss', './client/styles/utils/mixins.scss']
            },
          },
        ]
      },

      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1} },
          'postcss-loader',
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
