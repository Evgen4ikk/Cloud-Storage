import { Avatar } from '@mui/material';
import { FC } from 'react';
import { FaFolderPlus, FaPlus } from 'react-icons/fa';
import cls from './Header.module.scss';

export const Header: FC = () => {
  return (
    <div className={cls.header}>
      <div className={cls.create}>
        <div className={cls.file}>
          <div className={cls.bg}>
            <FaPlus className={cls.icon} size={18} />
          </div>
          <span>Add File</span>
        </div>
        <div className={cls.folder}>
          <FaFolderPlus className={cls.icon} size={24} />
          <span>Add Folder</span>
        </div>
      </div>
      <div>
        <Avatar
          alt='ava'
          src='https://yt3.googleusercontent.com/qYOuZp5Pr26ViZmau7siMfv8A29limIP-4ti5fRwTaF0u7qsiCYOS3F3Z1kQxWF9h7Wgm4eQYw=s900-c-k-c0x00ffffff-no-rj'
        />
      </div>
    </div>
  );
};
