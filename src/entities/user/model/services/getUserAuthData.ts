import { IUser } from '../types/user';

export const getUserAuthData = (): IUser => {
  const userString = localStorage.getItem('user');

  if (userString) {
    return JSON.parse(userString);
  } else {
    return null;
  }
};
