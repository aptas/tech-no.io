import path from 'path';
import http from 'http';
import express from 'express';
import compression from 'compression';
import logger from 'morgan';

const root = path.join(__dirname, './../public');

const production = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

const app = express();

if (production) {
  require('./server.prod')(app, root);
} else {
  require('./server.dev')(app, root);
}

app.use(compression());
app.use(logger(production ? 'combined' : 'dev'));

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) console.log(err);

  console.log('Server running on port %s', port);
});
