import { Avatar } from '@mui/material';
import { FC } from 'react';
import cls from './Header.module.scss';
import { getUserAuthData } from 'entities/user'

export const Header: FC = () => {
  const user = getUserAuthData();
  return (
    <div className={cls.header}>
      <div className={cls.profile}>
        <span>{user.name}</span>
        <Avatar alt='ava' src={user.picture} />
      </div>
    </div>
  );
};
