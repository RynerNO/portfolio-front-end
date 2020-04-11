import Express from 'express';

import Mongoose from 'mongoose';

import config from '@config';

import v1Router from '@routes';

import path from 'path';

import BodyParser from 'body-parser';

import compression from 'compression';

import cors from 'cors';
Mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const app = Express();

app.use(BodyParser.json());
app.use(cors())
app.use(compression());

app.use(v1Router);

app.use(Express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'public/index.html'));
  
  
  
});
app.listen(3000, () => {
  console.log('run');
});
