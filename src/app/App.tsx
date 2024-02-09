import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from 'widgets/Header';
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/router';
import './styles/index.scss';

const App: FC = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <div className='app'>
      {!isLoginPage && <Sidebar />}
      {!isLoginPage && <Header />}
      <div className={!isLoginPage ? 'container' : ''}>
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
