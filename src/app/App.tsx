import { FC } from 'react';
import { Header } from 'widgets/Header';
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/router';
import './styles/index.scss';

const App: FC = () => {
  // console.log(process.env.CLIENT_ID);
  return (
    <div className='app'>
      <Sidebar />
      <Header />
      <div className='container'>
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
