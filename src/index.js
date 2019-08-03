import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import Routers from './routers';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/modules/reducer';

import './sources/style/index.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root')
);
