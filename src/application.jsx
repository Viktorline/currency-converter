import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import AppRoutes from './AppRoutes.jsx';
import store from './slices/store.js';

const App = async () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </ConfigProvider>
  );
};

export default App;
