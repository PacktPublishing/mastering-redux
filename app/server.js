const express = require('express');
const webpack = require('webpack');
const clientConfig = require('./config/webpack.config');
const serverConfig = require('./config/server/webpack.config');

const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;
const DEV = process.env.NODE_ENV === 'development';
const app = express();

let isBuilt = false;
const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log('BUILD COMPLETE -- Listening @ http://localhost:3000');
  });

webpack([clientConfig, serverConfig]).run(() => {
  app.use(publicPath, express.static(outputPath));
  const serverRender = require('./dist/server.js').default;
  app.use(serverRender());
  done();
});
