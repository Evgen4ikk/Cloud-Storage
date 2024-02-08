import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { FC, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './styles/index.scss';

const App: FC = () => {
  return (
    <div className='app'>
      <Link to={'/'}>Main</Link>
      <Link to={'/about'}>About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={'/about'} element={<AboutPage />} />
          <Route path={'/'} element={<MainPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
