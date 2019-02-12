import '@babel/polyfill';
import getApp from 'src/getApp';
import ReactDOM from 'react-dom';
import getStore from 'src/getStore';

const store = getStore(window.REDUX_STATE);

ReactDOM.hydrate(getApp(store), document.getElementById('root'));
