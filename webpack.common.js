require('dotenv').config();
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin')
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist/public')
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
          'vue-style-loader',
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
              resources: ['./src/client/styles/utils/colors.sass', './src/client/styles/utils/mixins.sass']
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
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
          'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1} },
          'postcss-loader',
        ]
      },
      {
        test: /\.svg$/,
        use: ['file-loader']
      },
    ]
  },
  plugins: [new VueLoaderPlugin(), new PrerenderSPAPlugin({
    // Required - The path to the webpack-outputted app to prerender.
    staticDir: path.join(__dirname, 'dist', 'public'),
    // Required - Routes to render.
    routes: [ '/', '/about'],
    postProcess (renderedRoute) {
      renderedRoute.originalRoute = "https://ruiner.xyz"
      return renderedRoute
    }
  })]
};
