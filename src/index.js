import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { login, fetchUser } from "./actions";
import getAccessToken from "./functions/getAccessToken";
import getUserId from "./functions/getUserId";
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

let store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

store.dispatch( login( getAccessToken(), getUserId() ) );
store.dispatch( fetchUser( getAccessToken(), getUserId() ) );

ReactDOM.render(
	<App store={store} />,
	document.getElementById('root')
);
