import ReactDOM from 'react-dom/client';
import app from './application.jsx';
import './index.css';

const run = async () => {
  const root = ReactDOM.createRoot(document.getElementById('main'));
  const dom = await app();
  root.render(dom);
};

run();
