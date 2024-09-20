import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/App"
import reducers from './reducers';
import middleware from "./middleware"
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore(reducers, middleware)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

