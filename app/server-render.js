import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import { ServerStyleSheet } from 'styled-components';
import flushChunks from 'webpack-flush-chunks';
import { getApp } from './src';

export default ({ clientStats }) => (req, res) => {
  const sheet = new ServerStyleSheet();
  const app = ReactDOM.renderToString(sheet.collectStyles(getApp()));
  const dashedChunkNames = flushChunkNames();
  const chunkNames = dashedChunkNames.map(str => str.replace('-', '/'));
  const { js } = flushChunks(clientStats, { chunkNames });
  const styleTags = sheet.getStyleTags();

  res.send(
    `<html>
      <head>
        ${styleTags}
      </head>
      <body>
        <div id="root">
         ${app}
        </div>
        ${js}
      </body>
    </html>`
  );
};
