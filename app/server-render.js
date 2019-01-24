import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import { ServerStyleSheet } from 'styled-components';
import flushChunks from 'webpack-flush-chunks';
import getApp from './src/getApp';
import getStore from './src/store';

export default ({ clientStats }) => (req, res) => {
  if (req.path !== '/favicon.ico') {
    const sheet = new ServerStyleSheet();
    const store = getStore(undefined, [req.path]);
    const app = ReactDOM.renderToString(sheet.collectStyles(getApp(store)));
    const chunkNames = flushChunkNames();
    const { js } = flushChunks(clientStats, { chunkNames });
    console.log(app);
    const styleTags = sheet.getStyleTags();
    res.send(
      `<html>
      <head>
        ${styleTags}
      </head>
      <body>
        <script>window.REDUX_STATE = ${JSON.stringify(
          store.getState()
        )}</script>
        <div id="root">
         ${app}
        </div>
        ${js}
      </body>
    </html>`
    );
  }
};
