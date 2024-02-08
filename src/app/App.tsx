import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRouter } from './providers/router';
import './styles/index.scss';

const App: FC = () => {
  return (
    <div className='app'>
      <Link to={'/'}>Main</Link>
      <Link to={'/about'}>About</Link>
      <AppRouter />
    </div>
  );
};

export default App;
