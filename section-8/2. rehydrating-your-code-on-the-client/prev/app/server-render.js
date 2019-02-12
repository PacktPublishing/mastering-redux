import React from 'react';
import ReactDOM from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import getApp from './src/getApp';
import getStore from './src/getStore';

export default (req, res) => {
  if (req.path !== '/favicon.ico') {
    const sheet = new ServerStyleSheet();
    const store = getStore(undefined, [req.path]);
    const app = ReactDOM.renderToString(sheet.collectStyles(getApp(store)));
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
          <!-- <script src="/static/main.js" defer></script> -->
        </body>
      </html>`
    );
  }
};
