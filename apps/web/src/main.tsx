import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import App from './App';
import './styles.css';

dayjs.locale('ru');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU} theme={{ token: {
      colorPrimary: '#566b55',
      colorText: '#25352d',
      colorTextSecondary: '#808b82',
      borderRadius: 14,
      fontFamily: 'Manrope, sans-serif',
      fontSize: 16,
      controlHeight: 42,
      colorBorder: '#e9ebe5',
    } }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
