import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  element: ReactElement;
}

const RequireAuth: FC<RequireAuthProps> = ({ element }) => {
  const token = sessionStorage.getItem('AccessToken');

  if (token) {
    return element;
  } else {
    return <Navigate to='/login' replace />;
  }
};

export default RequireAuth;
