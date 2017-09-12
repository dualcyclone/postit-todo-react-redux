import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { TODOLIST_PERSISTANCE } from './main/constants';
import reducer from './main/reducer';
import App from './components/App';
import './index.css';

const store = createStore(reducer);

// persisting the store to localStorage
store.subscribe(() => {
  localStorage.setItem(
    TODOLIST_PERSISTANCE,
    JSON.stringify(store.getState())
  )
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
