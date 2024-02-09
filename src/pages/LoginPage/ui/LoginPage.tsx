import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './LoginPage.module.scss';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={cls.login}>
      <div className={cls.title}>
        Login with Google Account
      </div>
      <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
        <GoogleLogin
          onSuccess={res => {
            console.log(res.credential);
            const decodedToken = jwtDecode(res.credential);
            sessionStorage.setItem('AccessToken', decodedToken.jti);
            localStorage.setItem('user', JSON.stringify(decodedToken));
            navigate('/');
          }}
          onError={() => {
            sessionStorage.removeItem('AccessToken');
            localStorage.removeItem('user');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginPage;
