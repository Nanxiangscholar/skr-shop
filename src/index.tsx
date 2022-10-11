import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// antd全局样式
import 'antd/dist/antd.min.css';

// 全局样式
import 'themes/all.scss'
import { BrowserRouter } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "redux/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);
