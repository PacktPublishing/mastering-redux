import '@babel/polyfill';
import getApp from 'src/getApp';
import ReactDOM from 'react-dom';
import getStore from 'src/getStore';
import Cache from 'src/cache.service';

async function startApp() {
  const cache = new Cache();
  cache.load(window.CACHE_DATA);
  const store = await getStore(window.REDUX_STATE, undefined, { cache });
  ReactDOM.hydrate(getApp(store, cache), document.getElementById('root'));
}

startApp();
