const express = require('express');
const webpack = require('webpack');
const serverConfig = require('./config/webpack.config.server');

const app = express();

let isBuilt = false;
const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log('BUILD COMPLETE -- Listening @ port 3000');
  });

webpack(serverConfig).run(() => {
  const serverRender = require('./dist/server.js').default;
  app.use(serverRender);
  done();
});
