import { FC} from 'react';
import AppRoutes from './components/AppRoutes/AppRoutes';
import Spinner from './components/common/Spinner/Spinner';

const App: FC = () => {
  return (
    <div className="container">
      <Spinner />
      <AppRoutes />
    </div>
  );
};

export default App;
