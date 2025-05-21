import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import { DataContextProvider } from './contexts/DataContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <DataContextProvider>
    <App />
  </DataContextProvider>
);
