import ReactDOM from 'react-dom/client';
import app from './application.jsx';
import './assets/styles/index.sass';

const run = async () => {
  const root = ReactDOM.createRoot(document.getElementById('main'));
  const dom = await app();
  root.render(dom);
};

run();
