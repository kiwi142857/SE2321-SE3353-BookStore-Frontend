import { ConfigProvider, theme } from 'antd';
import { blue } from '@ant-design/colors';
import AppRouter from './components/router';

function App() {
  const themeToken = {
    colorPrimary: blue.primary,
    colorInfo: blue.primary,
  };
  return (
    <ConfigProvider theme={{
      algorithm: theme.defaultAlgorithm,
      token: themeToken
    }} >
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
