import { getUserAuthData } from 'entities/user';
import { FC } from 'react';

export const ProfilePage: FC = () => {
  const user = getUserAuthData();

  return (
    <div>
      <h1>Profile</h1>
      <div>{user.name}</div>
    </div>
  );
};
