import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
//store
import { createStore } from "redux";
import { Provider } from "react-redux";
import myReducer from './reducers/index';

const store = createStore(myReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
