import '@babel/polyfill';
import getApp from 'src/getApp';
import ReactDOM from 'react-dom';
import getStore from 'src/getStore';

async function startApp() {
  const store = await getStore(window.REDUX_STATE);

  ReactDOM.hydrate(getApp(store), document.getElementById('root'));
}

startApp();
