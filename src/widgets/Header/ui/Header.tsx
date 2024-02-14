import { Avatar } from '@mui/material';
import { getUserAuthData } from 'entities/user';
import { FileUploader } from 'features/FileUploader';
import { FolderCreate } from 'features/FolderCreate';
import { FC } from 'react';
import { FaFolderPlus, FaPlus } from 'react-icons/fa';
import { useOutside } from 'shared/lib/hooks/useOutside';
import { Modal } from 'shared/ui/Modal/Modal';
import { TotalMemory } from 'widgets/TotalMemory';
import cls from './Header.module.scss';

export const Header: FC = () => {
  const user = getUserAuthData();

  return (
    <>
      <div className={cls.header}>
        <div className=""></div>
        <div className={cls.info}>
          <div className={cls.totalMemory}>
            <span>Total Memory: </span>
            <TotalMemory />
            <span>/ 3 Mb</span>
          </div>
          <div className={cls.profile}>
            <span>{user.name}</span>
            <Avatar alt='ava' src={user.picture} />
          </div>
        </div>
      </div>
    </>
  );
};
