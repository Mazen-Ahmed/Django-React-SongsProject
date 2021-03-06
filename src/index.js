import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import RootReducer from './store/reducers/rootReducer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css';



const enhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(RootReducer,enhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
