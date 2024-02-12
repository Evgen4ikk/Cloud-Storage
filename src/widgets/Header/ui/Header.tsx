import { Avatar } from '@mui/material';
import { getUserAuthData } from 'entities/user';
import { FileUploader } from 'features/FileUploader';
import { FolderCreate } from 'features/FolderCreate';
import { FC } from 'react';
import { FaFolderPlus, FaPlus } from 'react-icons/fa';
import { useOutside } from 'shared/lib/hooks/useOutside';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './Header.module.scss';

export const Header: FC = () => {
  const user = getUserAuthData();

  const {
    isShow: isFileUploadShow,
    ref: fileUploadRef,
    setIsShow: setIsFIleUploadShow,
  } = useOutside(false);

  const {
    isShow: isFolderCreateShow,
    ref: folderCreateRef,
    setIsShow: setIsFolderCreateShow,
  } = useOutside(false);

  const handleCloseModal = () => {
    setIsFIleUploadShow(false);
    setIsFolderCreateShow(false);
  };

  return (
    <>
      <div className={cls.header}>
        <div className={cls.create}>
          <div className={cls.file} onClick={() => setIsFIleUploadShow(true)}>
            <div className={cls.bg}>
              <FaPlus className={cls.icon} size={18} />
            </div>
            <span>Add File</span>
          </div>
          <div
            className={cls.folder}
            onClick={() => setIsFolderCreateShow(true)}
          >
            <FaFolderPlus className={cls.icon} size={24} />
            <span>Add Folder</span>
          </div>
        </div>
        <div className={cls.profile}>
          <span>{user.name}</span>
          <Avatar alt='ava' src={user.picture} />
        </div>
      </div>
      {isFileUploadShow && (
        <div ref={fileUploadRef}>
          <div className={cls.backdrop} onClick={handleCloseModal} />
          <Modal>
            <FileUploader onCloseModal={handleCloseModal} />
          </Modal>
        </div>
      )}
      {isFolderCreateShow && (
        <div ref={folderCreateRef}>
          <div className={cls.backdrop} onClick={handleCloseModal} />
          <Modal>
            <FolderCreate onCloseModal={handleCloseModal} />
          </Modal>
        </div>
      )}
    </>
  );
};
