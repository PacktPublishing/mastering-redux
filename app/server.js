const express = require('express');
const webpack = require('webpack');
const clientConfig = require('./config/webpack.config.dev');
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

webpack([clientConfig, serverConfig]).run((err, stats) => {
  const clientStats = stats.toJson().children[0];
  const serverRender = require('./dist/server/server.js').default;

  app.use(publicPath, express.static(outputPath));
  app.get('*', serverRender({ clientStats }));

  done();
});
