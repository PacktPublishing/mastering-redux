import '@babel/polyfill';
import getApp from 'src/getApp';
import ReactDOM from 'react-dom';
import getStore from 'src/getStore';
import cache from 'src/cache.service';

async function startApp() {
  const store = await getStore(window.REDUX_STATE);
  cache.load(window.CACHE_DATA);
  ReactDOM.hydrate(getApp(store), document.getElementById('root'));
}

startApp();
