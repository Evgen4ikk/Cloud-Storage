import { Button, Input, message } from 'antd';
import { FC, useState } from 'react';
import cls from './FolderCreate.module.scss';

interface FolderProps {
  onCloseModal: () => void;
}

export const FolderCreate: FC<FolderProps> = ({ onCloseModal }) => {
  const [folderName, setFolderName] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleCreateFolder = () => {
    if (folderName.trim() === '') {
      message.error('Please enter a folder name');
      return;
    }

    const storedFolders = localStorage.getItem('Folders');
    const folders = storedFolders ? JSON.parse(storedFolders) : {};

    if (folders[folderName]) {
      message.error('Folder with this name already exists');
      return;
    }

    folders[folderName] = [];

    localStorage.setItem('Folders', JSON.stringify(folders));

    message.success('Folder created successfully');
    onCloseModal();
  };

  return (
    <div className={cls.content}>
      <Input
        placeholder='Enter folder name'
        value={folderName}
        onChange={handleInputChange}
      />
      <Button className={cls.btn} onClick={handleCreateFolder}>
        Create Folder
      </Button>
    </div>
  );
};
