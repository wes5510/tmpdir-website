import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { IntlProvider } from 'react-intl';

import uploadReducer from '_data/reducers/upload';
import downloadReducer from '_data/reducers/download';
import UploadApp from '_app/Upload/App';
import DownloadApp from '_app/Download/App';
import Utils from '_modules/common/utils';
import Const from '_modules/common/const';
import manifest from '_modules/manifest';
import logger from '_modules/logger';
import getConfig from '_modules/config';

const Config = getConfig();

const getStore = (id) => {
  switch (id) {
    case Const.appType.upload.id:
      return createStore(uploadReducer);
    default:
      return createStore(downloadReducer);
  }
};

const getApp = (id, store, lang) => {
  let app;
  switch (id) {
    case Const.appType.upload.id:
      app = <UploadApp />;
      break;
    default:
      app = <DownloadApp />;
      break;
  }
  return (
    <Provider store={store}>
      <IntlProvider locale={lang}>
        {app}
      </IntlProvider>
    </Provider>
  );
};

const render = (type, lang) => {
  const store = getStore(type.id);
  const html = `
    <!doctype html>
    <html>
      <head>
      ${Config.dependency.css.map(url => Utils.makeCssNode(url)).join('')}
      </head>
      <body>
        <div id="root">
          ${renderToString(getApp(type.id, store, lang))}
        </div>
      <script>
        window.INITIAL_STATE = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}
        window.INITIAL_LANG = "${lang}"
      </script>
        ${Utils.makeJsNode(manifest.getJsUri(Const.vendor))}
        ${Utils.makeJsNode(manifest.getJsUri(type.name))}
      </body>
    </html>
  `;
  logger.info({ type, lang, html }, 'render html of type');
  return html;
};

export default render;
