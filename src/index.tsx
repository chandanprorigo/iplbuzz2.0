import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import { DataContextProvider } from './contexts/DataContextProvider';
import { SpinnerProvider } from './contexts/SpinnerContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <SpinnerProvider>
    <DataContextProvider>
        <App />
    </DataContextProvider>
  </SpinnerProvider>
);
