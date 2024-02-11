import { FileItem, FileUploader, UploadedFile } from 'features/FileUploader';
import { FolderCreate } from 'features/FolderCreate';
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

  return (
    <div className={cls.main}>
      <div className={cls.content}>
        <h1>My Cloud</h1>
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
      </div>
      <div className=''>
        <h2>Files:</h2>
        <div className={cls.fileList}>
          {files.map((file, index) => (
            <FileItem key={index} file={file} />
          ))}
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
    </div>
  );
};

export default MainPage;
