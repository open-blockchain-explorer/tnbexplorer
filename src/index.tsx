import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from 'store';
import ReactGA from 'react-ga';
import {config as dotenvConfig} from 'dotenv';

import App from 'containers/App';

import 'styles/main.css';
import reportWebVitals from './reportWebVitals';

dotenvConfig();

const measurementId = 'UA-166269409-1';
ReactGA.initialize(measurementId, {debug: true});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
