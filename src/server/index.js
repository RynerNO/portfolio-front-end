import Express from 'express';

import Mongoose from 'mongoose';

import config from '@config';

import v1Router from '@routes';

import Webpack from 'webpack';

import WebpackConfig from '../../webpack.dev';

import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';


import path from 'path';

import BodyParser from 'body-parser';

import compression from 'compression';

dotenv.config();
Mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const app = Express();

app.use(BodyParser.json());

app.use(compression());
if (process.env.NODE_ENV === 'development') {
 
  const compiler = Webpack(WebpackConfig);
  app.use(
        WebpackDevMiddleware(compiler, {
          hot: true,
          publicPath: WebpackConfig.output.publicPath
        })
      );
        app.use(WebpackHotMiddleware(compiler));
}
app.use(v1Router);

app.use(Express.static(path.resolve('dist', 'public')));

app.get('*', (req, res) => {

  res.sendFile(path.resolve('dist', 'public/index.html'));
  
  
  
});
app.listen(3000, () => {
  console.log('SERVER RUNNING ON PORT: 3000');
});
