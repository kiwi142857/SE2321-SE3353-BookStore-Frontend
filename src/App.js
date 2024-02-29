import { ConfigProvider, theme } from 'antd';
import AppRouter from './components/router';
import React from 'react';

function App() {
  const themeToken = {
    colorPrimary: "#1DA57A",
    colorInfo: "#1DA57A"
  }
  return (<ConfigProvider theme={{
    algorithm: theme.defaultAlgorithm,
    token: themeToken
  }} >
    <AppRouter />
  </ConfigProvider>)
}

export default App;
