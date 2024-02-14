import { FileList, FileUploader, UploadedFile } from 'features/FileUploader';
import { FolderCreate, FolderList } from 'features/FolderCreate';
import { IFolder } from 'features/FolderCreate/types/folder';
import { FC, useEffect, useState } from 'react';
import { FaFolderPlus, FaPlus } from 'react-icons/fa';
import { useOutside } from 'shared/lib/hooks/useOutside';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './MainPage.module.scss';

const MainPage: FC = () => {
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

  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const uploadedFiles = localStorage.getItem('uploadedFiles');

    if (uploadedFiles) {
      const parsedFiles = JSON.parse(uploadedFiles);
      setFiles(parsedFiles);
    }
  }, [isFileUploadShow]);

  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    const storedFolders = localStorage.getItem('Folders');
    if (storedFolders) {
      const parsedFolders = JSON.parse(storedFolders);
      const folderNames = Object.keys(parsedFolders);
      const folderArray: IFolder[] = folderNames.map((name: string) => ({
        name,
        files: parsedFolders[name],
      }));
      setFolders(folderArray);
    }
  }, [isFolderCreateShow]);

  return (
    <>
      <div className={cls.main}>
        <div className={cls.content}>
          <div className={cls.title}>
            <h1>My Cloud</h1>
            <div className={cls.create}>
              <div
                className={cls.file}
                onClick={() => setIsFIleUploadShow(true)}
              >
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
          </div>
          <FileList files={files} setFiles={setFiles} />
          <FolderList folders={folders} />
        </div>
      </div>
      {isFileUploadShow && (
        <div ref={fileUploadRef}>
          <div className={cls.backdrop} onClick={handleCloseModal} />
          <Modal width='30%' height='250px'>
            <FileUploader onCloseModal={handleCloseModal} />
          </Modal>
        </div>
      )}
      {isFolderCreateShow && (
        <div ref={folderCreateRef}>
          <div className={cls.backdrop} onClick={handleCloseModal} />
          <Modal width='30%' height='250px'>
            <FolderCreate onCloseModal={handleCloseModal} />
          </Modal>
        </div>
      )}
    </>
  );
};

export default MainPage;
