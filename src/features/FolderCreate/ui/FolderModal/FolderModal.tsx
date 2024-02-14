import { IFolder } from 'features/FolderCreate/types/folder';
import { FC } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { AddFileToFolder } from '../AddFileToFolder/AddFileToFolder';
import cls from './FolderModal.module.scss';

interface IFolderModal {
  folder: IFolder;
  onClose: () => void;
}

export const FolderModal: FC<IFolderModal> = ({ folder, onClose }) => {
  const handleDeleteFolder = () => {
    const foldersData = JSON.parse(localStorage.getItem('Folders') || '{}');
    if (foldersData.hasOwnProperty(folder.name)) {
      delete foldersData[folder.name];
      localStorage.setItem('Folders', JSON.stringify(foldersData));
      onClose();
    }
  };

  return (
    <div className={cls.folderModal}>
      <div className={cls.folder}>
        <h1>{folder.name}</h1>
        <MdOutlineDelete size={22} onClick={handleDeleteFolder} />
      </div>
      <AddFileToFolder folder={folder} />
    </div>
  );
};
