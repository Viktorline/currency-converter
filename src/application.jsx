import { Provider } from 'react-redux';
import AppRoutes from './AppRoutes.jsx';
import store from './slices/store.js';

const App = async () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
