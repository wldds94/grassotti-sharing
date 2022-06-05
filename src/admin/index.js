import React from 'react';
import ReactDOM from 'react-dom/client'; // import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('graxsh-admin-root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// ReactDOM.render(
//     <h1>Hello World from React</h1>,
//   document.getElementById('graxsh-admin-root')
// );