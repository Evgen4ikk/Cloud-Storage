import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import RequireAuth from './RequireAuth';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: any) => {
    const element = (
      <Suspense fallback='Loading...'>
        {route.path === '/login' ? (
          route.element
        ) : (
          <RequireAuth element={route.element} />
        )}
      </Suspense>
    );
    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
