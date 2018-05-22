import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import uploadReducer from '_data/reducers/upload';
import downloadReducer from '_data/reducers/download';
import UploadApp from '_app/Upload/App';
import DownloadApp from '_app/Download/App';
import Utils from '_modules/common/utils';
import Const from '_modules/common/const';
import manifast from '_modules/manifast';
import logger from '_modules/logger';

const getStore = (id) => {
  switch (id) {
    case Const.appType.upload.id:
      return createStore(uploadReducer);
    default:
      return createStore(downloadReducer);
  }
};

const getApp = (id, store) => {
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
      {app}
    </Provider>
  );
};

const render = (type) => {
  const store = getStore(type.id);
  const html = `
    <!doctype html>
    <html>
      <head>
        ${Utils.makeCssNode(manifast.getCssUrls(type.name))}
      </head>
      <body>
        <div id="root">
          ${renderToString(getApp(type.id, store))}
        </div>
      <script>
        window.INITIAL_STATE = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}
      </script>
        ${Utils.makeJsNode(manifast.getJsUrls(Const.vendor))}
        ${Utils.makeJsNode(manifast.getJsUrls(type.name))}
      </body>
    </html>
  `;
  logger.info({ type, html }, 'render html of type');
  return html;
};

export default render;
