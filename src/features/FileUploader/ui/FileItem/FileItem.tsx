import { FC, useState } from 'react';
import { FaCheck, FaFile } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { useOutside } from 'shared/lib/hooks/useOutside';
import { bytesToKB } from 'shared/lib/utils/bytesToKB';
import { UploadedFile } from '../../types/file';
import cls from './FileItem.module.scss';

interface IFileItem {
  file: UploadedFile;
  onDelete: () => void;
  onRename: (newName: string) => void;
  onDownload: () => void;
}

export const FileItem: FC<IFileItem> = ({
  file,
  onDelete,
  onRename,
  onDownload,
}) => {
  const { isShow, ref, setIsShow } = useOutside(false);
  const {
    isShow: isRenamingShow,
    ref: renamingRef,
    setIsShow: setIsRenamingShow,
  } = useOutside(false);
  const [newFileName, setNewFileName] = useState(file.name);

  const handleRename = () => {
    onRename(newFileName);
    setIsRenamingShow(false);
  };

  const handleCloseModal = () => {
    setIsShow(false);
  };

  const handleInputRename = () => {
    setIsRenamingShow(true);
    handleCloseModal();
  };

  const handleDelete = () => {
    onDelete();
    handleCloseModal();
  };

  const handleDownload = () => {
    onDownload();
    handleCloseModal();
  };

  return (
    <div className={cls.item}>
      <div className={cls.fileIcon}>
        <FaFile size={48} />
      </div>
      <button className={cls.moreBtn} onClick={() => setIsShow(!isShow)}>
        <IoMdMore size={28} />
      </button>
      {isShow && (
        <div ref={ref} className={cls.moreInf}>
          <ul>
            <li onClick={handleDownload}>Download</li>
            <li onClick={handleDelete}>Delete</li>
            <li onClick={handleInputRename}>Rename</li>
          </ul>
        </div>
      )}
      {isRenamingShow ? (
        <div ref={renamingRef} className={cls.rename}>
          <input
            type='text'
            value={newFileName}
            onChange={e => setNewFileName(e.target.value)}
          />
          <FaCheck className={cls.icon} color='green' onClick={handleRename} />
        </div>
      ) : (
        <div className={cls.fileName}>{file.name}</div>
      )}
      <div className={cls.fileSize}>{bytesToKB(file.size)}</div>
    </div>
  );
};
