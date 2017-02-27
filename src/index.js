import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import myYoastApp from './reducers';
import { login } from "./actions";
import getAccessToken from "./functions/getAccessToken";
import getUserId from "./functions/getUserId";

let store = createStore( myYoastApp );

store.dispatch( login( getAccessToken(), getUserId() ) );

ReactDOM.render(
  <Provider store={store}>
	<App />
  </Provider>,
  document.getElementById('root')
);
